/**
 * `cg-web-skills install <skill...>` and `cg-web-skills install --all`
 *
 * Copies `skills/<skill>/` verbatim into the Claude skills directory:
 * `<project>/.claude/skills/<skill>/` by default, or the personal
 * `~/.claude/skills/<skill>/` with `--global`. With `--all`, every skill in
 * the registry is installed.
 *
 * Skill content is treated strictly as data: files are copied, never
 * executed or modified. Existing installations are never overwritten. Each
 * installed skill is recorded in the lockfile, so `update` can later tell
 * whether it was edited locally.
 */

import { discoverSkills } from './list.js';
import { ExitCode } from '../utils/exit-codes.js';
import { recordSkill } from '../utils/lockfile.js';
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

const USAGE = 'Usage: cg-web-skills install <skill...>\n       cg-web-skills install --all';

function usageError(message) {
  logger.error(message);
  logger.info();
  logger.info(USAGE);
  return ExitCode.USAGE;
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
    const problem = await checkSource(name, source, version);
    if (problem) {
      logger.error(problem.message);
      logger.info();
      logger.info(problem.hint);
      return ExitCode.ERROR;
    }
  }

  const scope = options.global ? 'user' : 'project';
  const claudeDirectory = getClaudeDirectory({ scope, cwd, env });
  const targetRoot = getClaudeSkillsDirectory({ scope, cwd, env });

  // With --all, existing skills are skipped so the command can be re-run to
  // pick up new skills. Naming an installed skill explicitly is an error.
  let conflict = false;
  for (const [name, source] of sources) {
    const destination = resolveSkillDirectory(targetRoot, name);
    const displayPath = formatPath(destination, cwd);

    // Never overwrite an existing installation.
    if (!(await lstatOrNull(destination)) && (await copySkill(source, destination))) {
      await recordSkill(claudeDirectory, name, { version, hash: await hashSkill(destination) });
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
