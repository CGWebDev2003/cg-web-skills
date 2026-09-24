/**
 * `cg-web-skills install <skill>`
 *
 * Copies `skills/<skill>/` verbatim into the Claude skills directory:
 * `<project>/.claude/skills/<skill>/` by default, or the personal
 * `~/.claude/skills/<skill>/` with `--global`.
 *
 * Skill content is treated strictly as data: files are copied, never
 * executed or modified. Existing installations are never overwritten.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { ExitCode } from '../utils/exit-codes.js';
import * as logger from '../utils/logger.js';
import {
  SKILL_FILE,
  formatPath,
  getClaudeSkillsDirectory,
  getSkillPath,
  getSkillsDirectory,
  isValidSkillName,
  resolveSkillDirectory,
} from '../utils/paths.js';

async function lstatOrNull(target) {
  try {
    return await fs.lstat(target);
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return null;
    throw err;
  }
}

/** A skill exists when its directory (not a symlink) contains a SKILL.md file. */
async function skillExists(skillPath) {
  const directory = await lstatOrNull(skillPath);
  if (!directory?.isDirectory()) return false;

  const skillFile = await lstatOrNull(path.join(skillPath, SKILL_FILE));
  return Boolean(skillFile?.isFile());
}

/**
 * Returns the first entry in `directory` that is not a regular file or
 * directory (symlinks, sockets, devices…), or null when there is none.
 * Symlinks could point outside the skill, so they are never copied.
 */
async function findUnsupportedEntry(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = await findUnsupportedEntry(entryPath);
      if (nested) return nested;
    } else if (!entry.isFile()) {
      return entryPath;
    }
  }
  return null;
}

export async function run(
  args,
  {
    cwd = process.cwd(),
    env = process.env,
    skillsDirectory = getSkillsDirectory(),
    options = {},
  } = {},
) {
  if (args.length !== 1) {
    logger.error(args.length === 0 ? 'Missing skill name.' : 'Too many arguments.');
    logger.info();
    logger.info('Usage: cg-web-skills install <skill>');
    return ExitCode.USAGE;
  }

  const [name] = args;

  // 1. Validate the skill name (rejects `..`, separators, absolute paths).
  if (!isValidSkillName(name)) {
    logger.error(`Invalid skill name: ${name}`);
    logger.info();
    logger.info('Skill names use lowercase kebab-case, for example `web-design`.');
    return ExitCode.USAGE;
  }

  // 2–3. Resolve the source directory and verify the skill exists.
  const source = getSkillPath(name, skillsDirectory);
  if (!(await skillExists(source))) {
    logger.error(`Skill not found: ${name}`);
    logger.info();
    logger.info('Run `cg-web-skills list` to see available skills.');
    return ExitCode.ERROR;
  }

  const unsupported = await findUnsupportedEntry(source);
  if (unsupported) {
    logger.error(`Skill "${name}" contains an unsupported entry: ${path.relative(source, unsupported)}`);
    logger.info('Skills may only contain regular files and directories.');
    return ExitCode.ERROR;
  }

  // 4. Determine the Claude skills installation directory.
  const scope = options.global ? 'user' : 'project';
  const targetRoot = getClaudeSkillsDirectory({ scope, cwd, env });
  const destination = resolveSkillDirectory(targetRoot, name);

  // 7. Never overwrite an existing installation.
  if (await lstatOrNull(destination)) {
    logger.error(`Skill "${name}" is already installed at ${formatPath(destination, cwd)}`);
    logger.info();
    logger.info('Remove the existing directory first if you want to reinstall it.');
    return ExitCode.ERROR;
  }

  // 5. Create the destination. The non-recursive mkdir of the skill directory
  // fails if something appeared since the check above, so nothing is replaced.
  await fs.mkdir(targetRoot, { recursive: true });
  try {
    await fs.mkdir(destination);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
    logger.error(`Skill "${name}" is already installed at ${formatPath(destination, cwd)}`);
    return ExitCode.ERROR;
  }

  // 6. Copy the complete skill directory without modifying its contents.
  try {
    for (const entry of await fs.readdir(source)) {
      await fs.cp(path.join(source, entry), path.join(destination, entry), {
        recursive: true,
        force: false,
        errorOnExist: true,
        preserveTimestamps: true,
      });
    }
  } catch (err) {
    // Only remove what this command created.
    await fs.rm(destination, { recursive: true, force: true });
    throw err;
  }

  logger.success(`Installed ${name} to ${formatPath(destination, cwd)}`);
  return ExitCode.SUCCESS;
}
