/**
 * Records which skills the CLI installed, in `<claude dir>/cg-web-skills.json`.
 *
 * `update` compares an installed skill with the fingerprint recorded here to
 * tell an untouched installation (safe to replace) from one with local edits.
 * The file lives next to `skills/`, not inside it, so Claude never loads it.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import * as logger from './logger.js';

export const LOCKFILE_NAME = 'cg-web-skills.json';

export function getLockfilePath(claudeDirectory) {
  return path.join(claudeDirectory, LOCKFILE_NAME);
}

/** Reads the lockfile. A missing or unreadable file counts as empty. */
export async function readLockfile(claudeDirectory) {
  const file = getLockfilePath(claudeDirectory);
  let content;
  try {
    content = await fs.readFile(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return { skills: {} };
    throw err;
  }

  try {
    const data = JSON.parse(content);
    const skills = data?.skills;
    return { skills: skills && typeof skills === 'object' && !Array.isArray(skills) ? skills : {} };
  } catch {
    logger.warning(`Ignoring ${LOCKFILE_NAME}: it is not valid JSON.`);
    return { skills: {} };
  }
}

/** Records `{ version, hash }` for a skill. */
export async function recordSkill(claudeDirectory, name, entry) {
  const lockfile = await readLockfile(claudeDirectory);
  lockfile.skills[name] = entry;

  const sorted = Object.fromEntries(Object.entries(lockfile.skills).sort(([a], [b]) => a.localeCompare(b)));
  await fs.mkdir(claudeDirectory, { recursive: true });
  await fs.writeFile(getLockfilePath(claudeDirectory), `${JSON.stringify({ skills: sorted }, null, 2)}\n`);
}
