/**
 * Centralized filesystem path logic.
 *
 * Every path the CLI reads from or writes to is resolved here, using Node's
 * cross-platform `path` APIs. Skill names are validated before they are ever
 * joined onto a directory, so user input can never escape the directory it
 * is meant to address.
 */

import { readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** File that marks a directory as a skill (Agent Skills convention). */
export const SKILL_FILE = 'SKILL.md';

/** Maximum skill name length, matching the Agent Skills `name` limit. */
export const MAX_SKILL_NAME_LENGTH = 64;

/** Lowercase kebab-case: `web-design`, `ui-design`, `seo`. */
const SKILL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Root of the installed cg-web-skills package (where package.json lives). */
export function getPackageRoot() {
  return PACKAGE_ROOT;
}

/** Version of the installed cg-web-skills package. */
export function getPackageVersion() {
  return JSON.parse(readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version;
}

/** Root of the user's project: the directory the CLI was run from. */
export function getProjectRoot(cwd = process.cwd()) {
  return path.resolve(cwd);
}

/** The skills registry shipped with this package. */
export function getSkillsDirectory() {
  return path.join(PACKAGE_ROOT, 'skills');
}

/**
 * Returns true when `name` is a safe, lowercase kebab-case skill name.
 * This rejects empty names, `.`, `..`, path separators, drive letters,
 * absolute paths, whitespace, and uppercase characters.
 */
export function isValidSkillName(name) {
  return (
    typeof name === 'string' &&
    name.length <= MAX_SKILL_NAME_LENGTH &&
    SKILL_NAME_PATTERN.test(name)
  );
}

/** Returns true when `child` resolves strictly inside `parent`. */
export function isPathInside(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return (
    relative !== '' &&
    !path.isAbsolute(relative) &&
    relative.split(path.sep)[0] !== '..'
  );
}

/**
 * Resolves `name` to a directory inside `baseDirectory`.
 * Throws when the name is invalid or the result would escape the base.
 */
export function resolveSkillDirectory(baseDirectory, name) {
  if (!isValidSkillName(name)) {
    throw new Error(`Invalid skill name: ${String(name)}`);
  }

  const base = path.resolve(baseDirectory);
  const resolved = path.resolve(base, name);

  if (!isPathInside(base, resolved)) {
    throw new Error(`Skill path escapes its directory: ${String(name)}`);
  }

  return resolved;
}

/** Source directory of a skill in this package's registry. */
export function getSkillPath(name, skillsDirectory = getSkillsDirectory()) {
  return resolveSkillDirectory(skillsDirectory, name);
}

/**
 * The Claude directory skills are installed into.
 *
 * - `project` scope (default): `<project>/.claude`
 * - `user` scope: `$CLAUDE_CONFIG_DIR`, or `~/.claude` when unset
 */
export function getClaudeDirectory({ scope = 'project', cwd = process.cwd(), env = process.env } = {}) {
  if (scope === 'user') {
    return env.CLAUDE_CONFIG_DIR
      ? path.resolve(env.CLAUDE_CONFIG_DIR)
      : path.join(os.homedir(), '.claude');
  }

  return path.join(getProjectRoot(cwd), '.claude');
}

/** The `skills` directory inside the Claude directory for `scope`. */
export function getClaudeSkillsDirectory(options = {}) {
  return path.join(getClaudeDirectory(options), 'skills');
}

/** Formats a path for display: relative when inside `cwd`, absolute otherwise. */
export function formatPath(target, cwd = process.cwd()) {
  const resolved = path.resolve(target);
  return isPathInside(cwd, resolved) ? path.relative(path.resolve(cwd), resolved) : resolved;
}
