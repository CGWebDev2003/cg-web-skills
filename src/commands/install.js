/**
 * `cg-web-skills install <skill...>` and `cg-web-skills install --all`
 *
 * Copies `skills/<skill>/` verbatim into the Claude skills directory:
 * `<project>/.claude/skills/<skill>/` by default, or the personal
 * `~/.claude/skills/<skill>/` with `--global`. With `--all`, every skill in
 * the registry is installed.
 *
 * Skill content is treated strictly as data: files are copied, never
 * executed or modified. Existing installations are never overwritten.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { discoverSkills } from './list.js';
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

const USAGE = 'Usage: cg-web-skills install <skill...>\n       cg-web-skills install --all';

function usageError(message) {
  logger.error(message);
  logger.info();
  logger.info(USAGE);
  return ExitCode.USAGE;
}

/**
 * Checks that the skill exists in the registry and contains only regular
 * files and directories. Returns an error message, or null when it is valid.
 */
async function checkSource(name, source) {
  if (!(await skillExists(source))) return `Skill not found: ${name}`;

  const unsupported = await findUnsupportedEntry(source);
  if (unsupported) {
    return `Skill "${name}" contains an unsupported entry: ${path.relative(source, unsupported)}`;
  }
  return null;
}

/** Copies one skill. Returns true when it was installed, false when it already exists. */
async function installSkill(source, destination) {
  // Never overwrite an existing installation.
  if (await lstatOrNull(destination)) return false;

  // The non-recursive mkdir of the skill directory fails if something appeared
  // since the check above, so nothing is replaced.
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    await fs.mkdir(destination);
  } catch (err) {
    if (err.code === 'EEXIST') return false;
    throw err;
  }

  // Copy the complete skill directory without modifying its contents.
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
  return true;
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
  let names;
  if (options.all) {
    if (args.length > 0) return usageError('Use either skill names or --all, not both.');
    names = (await discoverSkills(skillsDirectory)).map((skill) => skill.name);
    if (names.length === 0) {
      logger.info('No skills are currently available.');
      return ExitCode.SUCCESS;
    }
  } else {
    if (args.length === 0) return usageError('Missing skill name.');
    names = [...new Set(args)];

    // Validate every name first (rejects `..`, separators, absolute paths).
    const invalid = names.find((name) => !isValidSkillName(name));
    if (invalid !== undefined) {
      logger.error(`Invalid skill name: ${invalid}`);
      logger.info();
      logger.info('Skill names use lowercase kebab-case, for example `web-design`.');
      return ExitCode.USAGE;
    }
  }

  // Check every source before copying anything, so a typo installs nothing.
  const sources = new Map(names.map((name) => [name, getSkillPath(name, skillsDirectory)]));
  for (const [name, source] of sources) {
    const problem = await checkSource(name, source);
    if (problem) {
      logger.error(problem);
      logger.info();
      logger.info(
        problem.startsWith('Skill not found')
          ? 'Run `cg-web-skills list` to see available skills.'
          : 'Skills may only contain regular files and directories.',
      );
      return ExitCode.ERROR;
    }
  }

  const scope = options.global ? 'user' : 'project';
  const targetRoot = getClaudeSkillsDirectory({ scope, cwd, env });

  // With --all, existing skills are skipped so the command can be re-run to
  // pick up new skills. Naming an installed skill explicitly is an error.
  let conflict = false;
  for (const [name, source] of sources) {
    const destination = resolveSkillDirectory(targetRoot, name);
    const displayPath = formatPath(destination, cwd);

    if (await installSkill(source, destination)) {
      logger.success(`Installed ${name} to ${displayPath}`);
    } else if (options.all) {
      logger.info(`- Skipped ${name}: already installed at ${displayPath}`);
    } else {
      logger.error(`Skill "${name}" is already installed at ${displayPath}`);
      conflict = true;
    }
  }

  if (conflict) {
    logger.info();
    logger.info('Remove the existing directory first if you want to reinstall it.');
    return ExitCode.ERROR;
  }
  return ExitCode.SUCCESS;
}
