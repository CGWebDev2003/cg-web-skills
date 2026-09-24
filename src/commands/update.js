/**
 * `cg-web-skills update <skill...>` and `cg-web-skills update --all`
 *
 * Replaces installed skills with the version shipped in this package. With
 * `--all`, every installed skill from this package is updated; skills that
 * are not installed are left alone (use `install` for those).
 *
 * A skill is only replaced when it is unchanged since the CLI installed it,
 * as recorded in the lockfile. A skill with local edits, or one installed
 * without a record, is left untouched unless `--force` is given; then the
 * current version is moved to `cg-web-skills-backups/` first.
 *
 * The new version is copied to a staging directory and swapped in with a
 * rename, so a failed copy never leaves a half-updated skill behind.
 */

import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { discoverSkills } from './list.js';
import { ExitCode } from '../utils/exit-codes.js';
import { readLockfile, recordSkill } from '../utils/lockfile.js';
import * as logger from '../utils/logger.js';
import {
  formatPath,
  getClaudeDirectory,
  getClaudeSkillsDirectory,
  getPackageVersion,
  getSkillPath,
  getSkillsDirectory,
  isValidSkillName,
  resolveSkillDirectory,
} from '../utils/paths.js';
import { checkSource, copySkill, hashSkill, lstatOrNull } from '../utils/skill-files.js';

const USAGE = 'Usage: cg-web-skills update <skill...>\n       cg-web-skills update --all';

/** Where replaced skills with local changes are kept, inside the Claude directory. */
export const BACKUP_DIRECTORY = 'cg-web-skills-backups';

/** Temporary directory for copies in progress, removed after each update. */
const STAGING_DIRECTORY = '.cg-web-skills-staging';

function usageError(message) {
  logger.error(message);
  logger.info();
  logger.info(USAGE);
  return ExitCode.USAGE;
}

async function isInstalled(destination) {
  return Boolean((await lstatOrNull(destination))?.isDirectory());
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Swaps `destination` for a fresh copy of `source`. The old version is moved
 * to `backup` when given, and deleted otherwise.
 */
async function replaceSkill(source, destination, { claudeDirectory, backup }) {
  const stagingRoot = path.join(claudeDirectory, STAGING_DIRECTORY);
  const staged = path.join(stagingRoot, randomUUID());
  const retired = backup ?? path.join(stagingRoot, randomUUID());

  try {
    await copySkill(source, staged);
    await fs.mkdir(path.dirname(retired), { recursive: true });
    await fs.rename(destination, retired);
    try {
      await fs.rename(staged, destination);
    } catch (err) {
      await fs.rename(retired, destination);
      throw err;
    }
  } finally {
    await fs.rm(staged, { recursive: true, force: true });
    if (!backup) await fs.rm(retired, { recursive: true, force: true });
    await fs.rmdir(stagingRoot).catch(() => {});
  }
}

export async function run(
  args,
  {
    cwd = process.cwd(),
    env = process.env,
    skillsDirectory = getSkillsDirectory(),
    version = getPackageVersion(),
    options = {},
  } = {},
) {
  const scope = options.global ? 'user' : 'project';
  const claudeDirectory = getClaudeDirectory({ scope, cwd, env });
  const targetRoot = getClaudeSkillsDirectory({ scope, cwd, env });

  let names;
  if (options.all) {
    if (args.length > 0) return usageError('Use either skill names or --all, not both.');
    names = [];
    for (const { name } of await discoverSkills(skillsDirectory)) {
      if (await isInstalled(resolveSkillDirectory(targetRoot, name))) names.push(name);
    }
    if (names.length === 0) {
      logger.info('No CG Web Skills are installed here.');
      logger.info('Install them with `cg-web-skills install --all`.');
      return ExitCode.SUCCESS;
    }
  } else {
    if (args.length === 0) return usageError('Missing skill name.');
    names = [...new Set(args)];

    const invalid = names.find((name) => !isValidSkillName(name));
    if (invalid !== undefined) {
      logger.error(`Invalid skill name: ${invalid}`);
      logger.info();
      logger.info('Skill names use lowercase kebab-case, for example `web-design`.');
      return ExitCode.USAGE;
    }
  }

  // Check everything before changing anything.
  const sources = new Map(names.map((name) => [name, getSkillPath(name, skillsDirectory)]));
  for (const [name, source] of sources) {
    const problem = await checkSource(name, source);
    if (problem) {
      logger.error(problem.message);
      logger.info();
      logger.info(problem.hint);
      return ExitCode.ERROR;
    }

    const destination = resolveSkillDirectory(targetRoot, name);
    if (!(await isInstalled(destination))) {
      logger.error(`Skill "${name}" is not installed at ${formatPath(destination, cwd)}`);
      logger.info();
      logger.info(`Install it with \`cg-web-skills install ${name}${options.global ? ' --global' : ''}\`.`);
      return ExitCode.ERROR;
    }
  }

  const { skills: recorded } = await readLockfile(claudeDirectory);
  let blocked = false;

  for (const [name, source] of sources) {
    const destination = resolveSkillDirectory(targetRoot, name);
    const installedHash = await hashSkill(destination);
    const packageHash = await hashSkill(source);

    if (installedHash === packageHash) {
      await recordSkill(claudeDirectory, name, { version, hash: packageHash });
      logger.info(`- ${name} is already up to date`);
      continue;
    }

    const previous = recorded[name];
    const edited = previous?.hash !== installedHash;
    if (edited && !options.force) {
      logger.error(
        previous
          ? `Skill "${name}" has local changes and was not updated.`
          : `Skill "${name}" was not installed by cg-web-skills, so local changes cannot be ruled out. It was not updated.`,
      );
      blocked = true;
      continue;
    }

    const backup = edited ? path.join(claudeDirectory, BACKUP_DIRECTORY, `${name}-${timestamp()}`) : null;
    await replaceSkill(source, destination, { claudeDirectory, backup });
    await recordSkill(claudeDirectory, name, { version, hash: packageHash });

    const from = previous?.version && previous.version !== version ? ` (${previous.version} → ${version})` : '';
    logger.success(`Updated ${name}${from}`);
    if (backup) logger.info(`  Previous version backed up to ${formatPath(backup, cwd)}`);
  }

  if (blocked) {
    logger.info();
    logger.info('Run the command again with --force to update anyway.');
    logger.info(`The current version is moved to ${formatPath(path.join(claudeDirectory, BACKUP_DIRECTORY), cwd)}/ first.`);
    return ExitCode.ERROR;
  }
  return ExitCode.SUCCESS;
}
