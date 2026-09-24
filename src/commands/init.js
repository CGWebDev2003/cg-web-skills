/**
 * `cg-web-skills init`
 *
 * Prepares the current project for CG Web Skills by creating the local
 * Claude skills directory (`.claude/skills/`). It never writes or overwrites
 * files, so running it repeatedly is safe.
 */

import fs from 'node:fs/promises';

import { ExitCode } from '../utils/exit-codes.js';
import * as logger from '../utils/logger.js';
import { formatPath, getClaudeSkillsDirectory, getProjectRoot } from '../utils/paths.js';

/** Marker for a path that cannot exist because a parent is a file. */
const BLOCKED = Symbol('blocked');

async function statOrNull(target) {
  try {
    return await fs.stat(target);
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    if (err.code === 'ENOTDIR') return BLOCKED;
    throw err;
  }
}

export async function run(_args, { cwd = process.cwd(), env = process.env, options = {} } = {}) {
  const scope = options.global ? 'user' : 'project';
  const projectRoot = getProjectRoot(cwd);
  const skillsDirectory = getClaudeSkillsDirectory({ scope, cwd: projectRoot, env });
  const displayPath = formatPath(skillsDirectory, projectRoot);
  const location = scope === 'user' ? 'your personal Claude directory' : projectRoot;

  const existing = await statOrNull(skillsDirectory);
  if (existing === BLOCKED || (existing && !existing.isDirectory())) {
    logger.error(`Cannot initialize: a file is blocking ${displayPath}`);
    return ExitCode.ERROR;
  }
  if (existing) {
    logger.success(`CG Web Skills is already initialized in ${location}`);
    logger.info(`  Skills directory: ${displayPath}`);
    return ExitCode.SUCCESS;
  }

  try {
    await fs.mkdir(skillsDirectory, { recursive: true });
  } catch (err) {
    if (err.code === 'EEXIST' || err.code === 'ENOTDIR') {
      logger.error(`Cannot initialize: a file is blocking ${displayPath}`);
      return ExitCode.ERROR;
    }
    throw err;
  }

  logger.success(`Initialized CG Web Skills in ${location}`);
  logger.info(`  Skills directory: ${displayPath}`);
  logger.info();
  logger.info('Next steps:');
  logger.info('  cg-web-skills list              List available skills');
  logger.info('  cg-web-skills install <skill>   Install a skill');

  return ExitCode.SUCCESS;
}
