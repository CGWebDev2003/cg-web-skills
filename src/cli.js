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
import { ExitCode } from './utils/exit-codes.js';
import * as logger from './utils/logger.js';
import { getPackageRoot, getSkillsDirectory } from './utils/paths.js';

const COMMANDS = {
  init: { module: init, supportsGlobal: true },
  list: { module: list, supportsGlobal: false },
  install: { module: install, supportsGlobal: true },
};

const OPTIONS = {
  global: { type: 'boolean', short: 'g' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
};

const HELP = `CG Web Skills

A professional Claude skillset for designing, building, and
optimizing modern, high-quality websites.

Usage:
  cg-web-skills <command> [options]

Commands:
  init                 Initialize CG Web Skills in the current project
  list                 List available skills
  install <skill>      Install a skill into the current project
  help                 Show help

Options:
  -g, --global         Use your personal Claude directory (init, install)
  -v, --version        Show version
  -h, --help           Show help

Examples:
  npx cg-web-skills init
  npx cg-web-skills list
  npx cg-web-skills install <skill>`;

function readVersion() {
  const manifest = JSON.parse(readFileSync(path.join(getPackageRoot(), 'package.json'), 'utf8'));
  return manifest.version;
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
    logger.info(HELP);
    return ExitCode.SUCCESS;
  }

  if (!Object.hasOwn(COMMANDS, commandName)) {
    return usageError(`Unknown command: ${commandName}`);
  }

  const command = COMMANDS[commandName];
  if (values.global && !command.supportsGlobal) {
    return usageError(`The --global option is not supported by \`${commandName}\`.`);
  }

  return command.module.run(args, {
    cwd: process.cwd(),
    env: process.env,
    skillsDirectory: getSkillsDirectory(),
    options: { global: Boolean(values.global) },
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
