/**
 * `cg-web-skills list`
 *
 * Discovers skills dynamically: every directory in `skills/` with a valid
 * kebab-case name and a `SKILL.md` file is a skill. Nothing is hard-coded.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import { ExitCode } from '../utils/exit-codes.js';
import * as logger from '../utils/logger.js';
import { SKILL_FILE, getSkillsDirectory, isValidSkillName } from '../utils/paths.js';

const MAX_DESCRIPTION_LENGTH = 100;

/**
 * Returns the skills found in `skillsDirectory`, sorted by name.
 * Each entry is `{ name, description, path }`.
 */
export async function discoverSkills(skillsDirectory = getSkillsDirectory()) {
  let entries;
  try {
    entries = await fs.readdir(skillsDirectory, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }

  const skills = [];
  for (const entry of entries) {
    // Symlinked directories are ignored: skill content must live in the registry.
    if (!entry.isDirectory() || !isValidSkillName(entry.name)) continue;

    const skillPath = path.join(skillsDirectory, entry.name);
    const content = await readSkillFile(path.join(skillPath, SKILL_FILE));
    if (content === null) continue;

    const { description = '' } = parseFrontmatter(content);
    skills.push({ name: entry.name, description, path: skillPath });
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

async function readSkillFile(file) {
  try {
    const stats = await fs.lstat(file);
    return stats.isFile() ? await fs.readFile(file, 'utf8') : null;
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

/**
 * Reads top-level `key: value` pairs from a SKILL.md YAML frontmatter block.
 * Supports plain, quoted, and folded (`>`) / literal (`|`) scalars, which is
 * all the metadata `list` needs. The file is only read, never executed.
 */
export function parseFrontmatter(content) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(content.replace(/^﻿/, ''));
  if (!match) return {};

  const data = {};
  const lines = match[1].split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const field = /^([A-Za-z0-9_-]+):[ \t]*(.*)$/.exec(lines[i]);
    if (!field) continue;

    const [, key] = field;
    let value = field[2].trim();

    if (/^[>|][+-]?$/.test(value)) {
      const block = [];
      while (i + 1 < lines.length && /^(\s+|$)/.test(lines[i + 1])) {
        block.push(lines[++i].trim());
      }
      value = block.filter(Boolean).join(' ');
    } else if (/^(["']).*\1$/.test(value)) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return data;
}

function truncate(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

export async function run(_args, { skillsDirectory = getSkillsDirectory() } = {}) {
  const skills = await discoverSkills(skillsDirectory);

  if (skills.length === 0) {
    logger.info('No skills are currently available.');
    logger.info('New CG Web Skills will be added in upcoming releases.');
    return ExitCode.SUCCESS;
  }

  const width = Math.max(...skills.map((skill) => skill.name.length));

  logger.info('Available skills:');
  logger.info();
  for (const { name, description } of skills) {
    const summary = truncate(description.replace(/\s+/g, ' ').trim(), MAX_DESCRIPTION_LENGTH);
    logger.info(`  ${name.padEnd(width)}  ${summary}`.trimEnd());
  }
  logger.info();
  logger.info('Install a skill with `cg-web-skills install <skill>`.');

  return ExitCode.SUCCESS;
}
