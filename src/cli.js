#!/usr/bin/env node

/**
 * CG Web Skills CLI entry point.
 *
 *   CLI
 *    ├── init
 *    ├── list
 *    └── install
 *
 * Each command module exports `run(args, context)` and resolves to an exit
 * code. This file only parses arguments and dispatches.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

import * as init from './commands/init.js';
import * as install from './commands/install.js';
import * as list from './commands/list.js';
import { BANNER, canShowBanner } from './utils/banner.js';
import { ExitCode } from './utils/exit-codes.js';
import * as logger from './utils/logger.js';
import { getPackageRoot, getSkillsDirectory } from './utils/paths.js';

const COMMANDS = {
  init: { module: init, supportsGlobal: true, supportsAll: false },
  list: { module: list, supportsGlobal: false, supportsAll: false },
  install: { module: install, supportsGlobal: true, supportsAll: true },
};

const OPTIONS = {
  all: { type: 'boolean', short: 'a' },
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
  help                 Show help

Options:
  -a, --all            Install every skill (install)
  -g, --global         Use your personal Claude directory (init, install)
  -v, --version        Show version
  -h, --help           Show help

Examples:
  npx cg-web-skills init
  npx cg-web-skills list
  npx cg-web-skills install --all
  npx cg-web-skills install cg-web-designer cg-web-animate

Documentation, issues, and source:
  ${REPOSITORY_URL}`;

function readVersion() {
  const manifest = JSON.parse(readFileSync(path.join(getPackageRoot(), 'package.json'), 'utf8'));
  return manifest.version;
}

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
    logger.info(readVersion());
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
  if (values.global && !command.supportsGlobal) {
    return usageError(`The --global option is not supported by \`${commandName}\`.`);
  }
  if (values.all && !command.supportsAll) {
    return usageError(`The --all option is not supported by \`${commandName}\`.`);
  }

  return command.module.run(args, {
    cwd: process.cwd(),
    env: process.env,
    skillsDirectory: getSkillsDirectory(),
    options: { global: Boolean(values.global), all: Boolean(values.all) },
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
