#!/usr/bin/env node

/**
 * CG Web Skills CLI entry point.
 *
 *   CLI
 *    ├── init
 *    ├── list
 *    ├── install
 *    └── update
 *
 * Each command module exports `run(args, context)` and resolves to an exit
 * code. This file only parses arguments and dispatches.
 */

import { parseArgs } from 'node:util';

import * as init from './commands/init.js';
import * as install from './commands/install.js';
import * as list from './commands/list.js';
import * as update from './commands/update.js';
import { BANNER, canShowBanner } from './utils/banner.js';
import { ExitCode } from './utils/exit-codes.js';
import * as logger from './utils/logger.js';
import { getPackageVersion, getSkillsDirectory } from './utils/paths.js';

const COMMANDS = {
  init: { module: init, options: ['global'] },
  list: { module: list, options: [] },
  install: { module: install, options: ['global', 'all'] },
  update: { module: update, options: ['global', 'all', 'force'] },
};

const OPTIONS = {
  all: { type: 'boolean', short: 'a' },
  force: { type: 'boolean', short: 'f' },
  global: { type: 'boolean', short: 'g' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
};

const TITLE = 'CG Web Skills';
const REPOSITORY_URL = 'https://github.com/CGWebDev2003/cg-web-skills';

const HELP = `A professional Claude skillset for designing, building, and
optimizing modern, high-quality websites.

Usage:
  cg-web-skills <command> [options]

Commands:
  init                 Initialize CG Web Skills in the current project
  list                 List available skills
  install <skill...>   Install one or more skills into the current project
  install --all        Install every skill
  update <skill...>    Update installed skills to this version
  update --all         Update every installed skill
  help                 Show help

Options:
  -a, --all            Every skill (install, update)
  -f, --force          Update edited skills too, keeping a backup (update)
  -g, --global         Use your personal Claude directory (init, install, update)
  -v, --version        Show version
  -h, --help           Show help

Examples:
  npx cg-web-skills init
  npx cg-web-skills list
  npx cg-web-skills install --all
  npx cg-web-skills install cg-web-designer cg-web-animate
  npx cg-web-skills@latest update --all

Documentation, issues, and source:
  ${REPOSITORY_URL}`;

function printHelp() {
  if (canShowBanner(process.stdout)) {
    logger.info();
    logger.accent(BANNER);
  } else {
    logger.info(TITLE);
  }
  logger.info();
  logger.info(HELP);
}

function usageError(message) {
  logger.error(message);
  logger.info();
  logger.info('Run `cg-web-skills --help` for usage.');
  return ExitCode.USAGE;
}

async function main(argv) {
  let parsed;
  try {
    parsed = parseArgs({ args: argv, options: OPTIONS, allowPositionals: true, strict: true });
  } catch (err) {
    const option = /'([^']+)'/.exec(err.message)?.[1];
    return usageError(
      err.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION' && option ? `Unknown option: ${option}` : err.message,
    );
  }

  const { values, positionals } = parsed;
  const [commandName, ...args] = positionals;

  if (values.version) {
    logger.info(getPackageVersion());
    return ExitCode.SUCCESS;
  }

  if (values.help || commandName === undefined || commandName === 'help') {
    printHelp();
    return ExitCode.SUCCESS;
  }

  if (!Object.hasOwn(COMMANDS, commandName)) {
    return usageError(`Unknown command: ${commandName}`);
  }

  const command = COMMANDS[commandName];
  for (const option of ['global', 'all', 'force']) {
    if (values[option] && !command.options.includes(option)) {
      return usageError(`The --${option} option is not supported by \`${commandName}\`.`);
    }
  }

  return command.module.run(args, {
    cwd: process.cwd(),
    env: process.env,
    skillsDirectory: getSkillsDirectory(),
    options: {
      global: Boolean(values.global),
      all: Boolean(values.all),
      force: Boolean(values.force),
    },
  });
}

// A reader that stops early (for example `cg-web-skills list | head`) closes
// the pipe. That is not an error, so exit quietly instead of crashing.
for (const stream of [process.stdout, process.stderr]) {
  stream.on('error', (err) => {
    if (err.code === 'EPIPE') process.exit(ExitCode.SUCCESS);
    throw err;
  });
}

main(process.argv.slice(2)).then(
  (code) => {
    process.exitCode = code;
  },
  (err) => {
    logger.error(`Unexpected error: ${err?.message ?? err}`);
    process.exitCode = ExitCode.ERROR;
  },
);
