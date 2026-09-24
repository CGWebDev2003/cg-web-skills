/**
 * Filesystem helpers shared by `install` and `update`.
 *
 * Skill content is treated strictly as data: these helpers read, hash, and
 * copy files, and never execute or modify them.
 */

import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { SKILL_FILE } from './paths.js';

export async function lstatOrNull(target) {
  try {
    return await fs.lstat(target);
  } catch (err) {
    if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return null;
    throw err;
  }
}

/** A skill exists when its directory (not a symlink) contains a SKILL.md file. */
export async function skillExists(skillPath) {
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
export async function findUnsupportedEntry(directory) {
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

/**
 * Checks that a registry skill exists and contains only regular files and
 * directories. Returns `{ message, hint }` describing the problem, or null.
 * `version` is the running CLI version, mentioned when the skill is missing.
 */
export async function checkSource(name, source, version) {
  if (!(await skillExists(source))) {
    // `npx cg-web-skills` can run an older cached CLI that predates the skill.
    const hint = ['Run `cg-web-skills list` to see available skills.'];
    if (version) {
      hint.push(`This is cg-web-skills ${version}. For skills added in newer versions, use \`npx cg-web-skills@latest\`.`);
    }
    return { message: `Skill not found: ${name}`, hint: hint.join('\n') };
  }

  const unsupported = await findUnsupportedEntry(source);
  if (unsupported) {
    return {
      message: `Skill "${name}" contains an unsupported entry: ${path.relative(source, unsupported)}`,
      hint: 'Skills may only contain regular files and directories.',
    };
  }
  return null;
}

/**
 * Copies a skill into `destination`, which must not exist yet. The
 * non-recursive mkdir fails if something appeared at `destination`, so
 * nothing is ever replaced. Returns false when `destination` already exists.
 */
export async function copySkill(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    await fs.mkdir(destination);
  } catch (err) {
    if (err.code === 'EEXIST') return false;
    throw err;
  }

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
    // Only remove what this function created.
    await fs.rm(destination, { recursive: true, force: true });
    throw err;
  }
  return true;
}

/** Lists every entry below `directory` as `{ file, regular }`, with `/` separators. */
async function listEntries(directory, prefix = '') {
  const result = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      result.push(...(await listEntries(path.join(directory, entry.name), file)));
    } else {
      result.push({ file, regular: entry.isFile() });
    }
  }
  return result;
}

/**
 * Returns a SHA-256 fingerprint of every file path and file content in a
 * skill directory. CRLF is hashed as LF, so a checkout that converted line
 * endings (Git on Windows) does not count as a local change.
 */
export async function hashSkill(directory) {
  const hash = createHash('sha256');
  const entries = (await listEntries(directory)).sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0));
  for (const { file, regular } of entries) {
    // Symlinks and other special entries are never followed, only noted.
    if (!regular) {
      hash.update(`${file}\0special\0`);
      continue;
    }
    const content = await fs.readFile(path.join(directory, ...file.split('/')));
    const normalized = Buffer.from(content.toString('latin1').replaceAll('\r\n', '\n'), 'latin1');
    hash.update(`${file}\0${normalized.length}\0`);
    hash.update(normalized);
  }
  return `sha256-${hash.digest('hex')}`;
}
