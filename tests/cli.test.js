import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import * as initCommand from '../src/commands/init.js';
import * as installCommand from '../src/commands/install.js';
import { discoverSkills, parseFrontmatter } from '../src/commands/list.js';
import * as listCommand from '../src/commands/list.js';
import { ExitCode } from '../src/utils/exit-codes.js';
import {
  getClaudeDirectory,
  getClaudeSkillsDirectory,
  getPackageRoot,
  getProjectRoot,
  getSkillPath,
  getSkillsDirectory,
  isPathInside,
  isValidSkillName,
  resolveSkillDirectory,
} from '../src/utils/paths.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLI = path.join(ROOT, 'src', 'cli.js');
const { version } = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));

const INVALID_NAMES = [
  '..',
  '.',
  '../escape',
  '../../etc/passwd',
  'nested/skill',
  'nested\\skill',
  '/absolute/path',
  'C:\\absolute',
  'Web-Design',
  'web_design',
  'web design',
  '-leading',
  'trailing-',
  'double--hyphen',
  '.hidden',
  'a'.repeat(65),
];

let sandbox;

before(async () => {
  sandbox = await fs.mkdtemp(path.join(os.tmpdir(), 'cg-web-skills-test-'));
});

after(async () => {
  await fs.rm(sandbox, { recursive: true, force: true });
});

/** Creates a fresh directory inside the test sandbox. */
async function tempDir(name) {
  return fs.mkdtemp(path.join(sandbox, `${name}-`));
}

/**
 * Runs the CLI in a child process with an isolated working directory and
 * home directory, so tests never touch the developer's real ~/.claude.
 */
async function runCli(args, { cwd } = {}) {
  const home = await tempDir('home');
  const result = spawnSync(process.execPath, [CLI, ...args], {
    cwd: cwd ?? (await tempDir('project')),
    encoding: 'utf8',
    env: {
      ...process.env,
      HOME: home,
      USERPROFILE: home,
      CLAUDE_CONFIG_DIR: path.join(home, '.claude'),
      NO_COLOR: '1',
    },
  });
  return { code: result.status, stdout: result.stdout, stderr: result.stderr, home };
}

/** Runs a command module in-process, capturing its output. */
async function runCommand(command, args, context) {
  const output = { stdout: '', stderr: '' };
  const originalStdout = process.stdout.write;
  const originalStderr = process.stderr.write;
  process.stdout.write = (chunk) => ((output.stdout += chunk), true);
  process.stderr.write = (chunk) => ((output.stderr += chunk), true);
  try {
    const code = await command.run(args, context);
    return { code, ...output };
  } finally {
    process.stdout.write = originalStdout;
    process.stderr.write = originalStderr;
  }
}

/** Builds a throwaway skills registry in a temporary directory. */
async function createRegistry(skills) {
  const registry = await tempDir('registry');
  for (const [name, files] of Object.entries(skills)) {
    for (const [file, content] of Object.entries(files)) {
      const target = path.join(registry, name, file);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, content);
    }
  }
  return registry;
}

async function exists(target) {
  return fs.lstat(target).then(
    () => true,
    () => false,
  );
}

describe('CLI startup', () => {
  it('shows help and exits 0 without arguments', async () => {
    const { code, stdout, stderr } = await runCli([]);
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /^CG Web Skills/);
    assert.match(stdout, /Usage:/);
    assert.equal(stderr, '');
  });

  for (const flag of ['--help', '-h', 'help']) {
    it(`shows help with ${flag}`, async () => {
      const { code, stdout } = await runCli([flag]);
      assert.equal(code, ExitCode.SUCCESS);
      for (const text of ['Usage:', 'Commands:', 'Options:', 'init', 'list', 'install <skill>', '--version']) {
        assert.ok(stdout.includes(text), `help should mention ${text}`);
      }
    });
  }

  for (const flag of ['--version', '-v']) {
    it(`prints the package version with ${flag}`, async () => {
      const { code, stdout } = await runCli([flag]);
      assert.equal(code, ExitCode.SUCCESS);
      assert.equal(stdout.trim(), version);
    });
  }

  it('rejects an unknown command with exit code 2', async () => {
    const { code, stdout, stderr } = await runCli(['deploy']);
    assert.equal(code, ExitCode.USAGE);
    assert.match(stderr, /Unknown command: deploy/);
    assert.match(stdout, /cg-web-skills --help/);
  });

  it('rejects an unknown option with exit code 2', async () => {
    const { code, stderr } = await runCli(['--bogus']);
    assert.equal(code, ExitCode.USAGE);
    assert.match(stderr, /Unknown option: --bogus/);
  });

  it('does not print stack traces for usage errors', async () => {
    const { stderr } = await runCli(['install', '../escape']);
    assert.doesNotMatch(stderr, /\n\s+at /);
  });
});

describe('list', () => {
  it('lists the skills shipped in the registry', async () => {
    const { code, stdout } = await runCli(['list']);
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /Available skills:/);
    assert.match(stdout, /cg-web-animate\s+Expert skill for designing/);
    assert.match(stdout, /cg-web-designer\s+Lead web designer, UX strategist/);
  });

  it('reports gracefully when no skills are available', async () => {
    const registry = await tempDir('empty-registry');
    const { code, stdout } = await runCommand(listCommand, [], { skillsDirectory: registry });
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /No skills are currently available\./);
  });

  it('rejects --global', async () => {
    const { code } = await runCli(['list', '--global']);
    assert.equal(code, ExitCode.USAGE);
  });

  it('discovers skills dynamically from the registry', async () => {
    const registry = await createRegistry({
      'web-design': { 'SKILL.md': '---\nname: web-design\ndescription: Design websites.\n---\n\nBody' },
      animation: { 'SKILL.md': '---\nname: animation\ndescription: "Motion design."\n---\n' },
      'no-skill-file': { 'notes.md': 'not a skill' },
      Invalid_Name: { 'SKILL.md': '---\nname: invalid\n---\n' },
    });
    await fs.writeFile(path.join(registry, 'README.md'), '# Registry');

    const skills = await discoverSkills(registry);
    assert.deepEqual(
      skills.map(({ name, description }) => ({ name, description })),
      [
        { name: 'animation', description: 'Motion design.' },
        { name: 'web-design', description: 'Design websites.' },
      ],
    );

    const { code, stdout } = await runCommand(listCommand, [], { skillsDirectory: registry });
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /animation\s+Motion design\./);
    assert.match(stdout, /web-design\s+Design websites\./);
    assert.doesNotMatch(stdout, /no-skill-file|Invalid_Name/);
  });

  it('treats a missing registry as empty', async () => {
    assert.deepEqual(await discoverSkills(path.join(sandbox, 'does-not-exist')), []);
  });

  it('parses SKILL.md frontmatter without executing it', () => {
    assert.deepEqual(parseFrontmatter('---\nname: seo\ndescription: \'Search.\'\n---\n'), {
      name: 'seo',
      description: 'Search.',
    });
    assert.deepEqual(parseFrontmatter('---\r\ndescription: >\r\n  Folded\r\n  text.\r\n---\r\n'), {
      description: 'Folded text.',
    });
    assert.deepEqual(parseFrontmatter('# No frontmatter'), {});
  });
});

describe('install', () => {
  it('reports a missing skill with exit code 1', async () => {
    const { code, stdout, stderr } = await runCli(['install', 'web-design']);
    assert.equal(code, ExitCode.ERROR);
    assert.match(stderr, /Skill not found: web-design/);
    assert.match(stdout, /Run `cg-web-skills list` to see available skills\./);
  });

  it('requires exactly one skill name', async () => {
    assert.equal((await runCli(['install'])).code, ExitCode.USAGE);
    assert.equal((await runCli(['install', 'a', 'b'])).code, ExitCode.USAGE);
  });

  for (const name of INVALID_NAMES) {
    it(`rejects the invalid skill name ${JSON.stringify(name)}`, async () => {
      const { code, stderr } = await runCli(['install', '--', name]);
      assert.equal(code, ExitCode.USAGE);
      assert.match(stderr, /Invalid skill name/);
    });
  }

  it('copies the complete skill directory verbatim into the project', async () => {
    const files = {
      'SKILL.md': '---\nname: demo-skill\ndescription: Demo.\n---\n\nInstructions.\n',
      'references/guide.md': '# Guide\n',
      'examples/example.html': '<!doctype html>\n',
      'assets/data.bin': Buffer.from([0, 1, 2, 255]),
      'scripts/do-not-run.sh': '#!/bin/sh\necho "should never run" > ran.txt\n',
    };
    const registry = await createRegistry({ 'demo-skill': files });
    const project = await tempDir('project');

    const { code, stdout } = await runCommand(installCommand, ['demo-skill'], {
      cwd: project,
      env: {},
      skillsDirectory: registry,
    });
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /Installed demo-skill/);

    const destination = path.join(project, '.claude', 'skills', 'demo-skill');
    for (const [file, content] of Object.entries(files)) {
      assert.deepEqual(await fs.readFile(path.join(destination, file)), Buffer.from(content));
    }
    assert.equal(await exists(path.join(project, 'ran.txt')), false);
    assert.equal(await exists(path.join(destination, 'ran.txt')), false);
  });

  it('never overwrites an existing installation', async () => {
    const registry = await createRegistry({ 'demo-skill': { 'SKILL.md': 'new content' } });
    const project = await tempDir('project');
    const destination = path.join(project, '.claude', 'skills', 'demo-skill');
    await fs.mkdir(destination, { recursive: true });
    await fs.writeFile(path.join(destination, 'SKILL.md'), 'existing content');

    const { code, stderr } = await runCommand(installCommand, ['demo-skill'], {
      cwd: project,
      env: {},
      skillsDirectory: registry,
    });
    assert.equal(code, ExitCode.ERROR);
    assert.match(stderr, /already installed/);
    assert.equal(await fs.readFile(path.join(destination, 'SKILL.md'), 'utf8'), 'existing content');
  });

  it('installs into the personal Claude directory with --global', async () => {
    const registry = await createRegistry({ 'demo-skill': { 'SKILL.md': 'content' } });
    const project = await tempDir('project');
    const configDir = await tempDir('claude-config');

    const { code } = await runCommand(installCommand, ['demo-skill'], {
      cwd: project,
      env: { CLAUDE_CONFIG_DIR: configDir },
      skillsDirectory: registry,
      options: { global: true },
    });
    assert.equal(code, ExitCode.SUCCESS);
    assert.equal(await fs.readFile(path.join(configDir, 'skills', 'demo-skill', 'SKILL.md'), 'utf8'), 'content');
    assert.equal(await exists(path.join(project, '.claude')), false);
  });

  it('refuses to copy skills that contain symlinks', async (t) => {
    const registry = await createRegistry({ 'demo-skill': { 'SKILL.md': 'content' } });
    try {
      await fs.symlink(os.tmpdir(), path.join(registry, 'demo-skill', 'link'));
    } catch {
      t.skip('symlinks are not available on this system');
      return;
    }
    const project = await tempDir('project');

    const { code, stderr } = await runCommand(installCommand, ['demo-skill'], {
      cwd: project,
      env: {},
      skillsDirectory: registry,
    });
    assert.equal(code, ExitCode.ERROR);
    assert.match(stderr, /unsupported entry/);
    assert.equal(await exists(path.join(project, '.claude', 'skills', 'demo-skill')), false);
  });

  it('does not treat a directory without SKILL.md as a skill', async () => {
    const registry = await createRegistry({ 'demo-skill': { 'README.md': 'no skill file' } });
    const { code, stderr } = await runCommand(installCommand, ['demo-skill'], {
      cwd: await tempDir('project'),
      env: {},
      skillsDirectory: registry,
    });
    assert.equal(code, ExitCode.ERROR);
    assert.match(stderr, /Skill not found: demo-skill/);
  });
});

describe('init', () => {
  it('creates the local Claude skills directory', async () => {
    const project = await tempDir('project');
    const { code, stdout } = await runCli(['init'], { cwd: project });
    assert.equal(code, ExitCode.SUCCESS);
    assert.match(stdout, /Initialized CG Web Skills/);
    assert.ok((await fs.stat(path.join(project, '.claude', 'skills'))).isDirectory());
  });

  it('is idempotent and never overwrites existing files', async () => {
    const project = await tempDir('project');
    assert.equal((await runCli(['init'], { cwd: project })).code, ExitCode.SUCCESS);

    const keep = path.join(project, '.claude', 'skills', 'existing-skill', 'SKILL.md');
    await fs.mkdir(path.dirname(keep), { recursive: true });
    await fs.writeFile(keep, 'keep me');

    const second = await runCli(['init'], { cwd: project });
    assert.equal(second.code, ExitCode.SUCCESS);
    assert.match(second.stdout, /already initialized/);
    assert.equal(await fs.readFile(keep, 'utf8'), 'keep me');

    assert.equal((await runCli(['init'], { cwd: project })).code, ExitCode.SUCCESS);
  });

  it('fails cleanly when a file blocks the skills directory', async () => {
    const project = await tempDir('project');
    await fs.writeFile(path.join(project, '.claude'), 'not a directory');

    const { code, stderr } = await runCli(['init'], { cwd: project });
    assert.equal(code, ExitCode.ERROR);
    assert.match(stderr, /Cannot initialize/);
    assert.doesNotMatch(stderr, /\n\s+at /);
    assert.equal(await fs.readFile(path.join(project, '.claude'), 'utf8'), 'not a directory');
  });

  it('initializes the personal Claude directory with --global', async () => {
    const project = await tempDir('project');
    const configDir = path.join(await tempDir('claude-config'), 'nested');

    const { code } = await runCommand(initCommand, [], {
      cwd: project,
      env: { CLAUDE_CONFIG_DIR: configDir },
      options: { global: true },
    });
    assert.equal(code, ExitCode.SUCCESS);
    assert.ok((await fs.stat(path.join(configDir, 'skills'))).isDirectory());
    assert.equal(await exists(path.join(project, '.claude')), false);
  });
});

describe('skills registry', () => {
  it('contains only valid skills', async () => {
    const entries = await fs.readdir(getSkillsDirectory(), { withFileTypes: true });
    const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    const skills = await discoverSkills();

    assert.ok(skills.length > 0, 'the registry should contain at least one skill');
    assert.deepEqual(
      skills.map((skill) => skill.name),
      [...directories].sort((a, b) => a.localeCompare(b)),
      'every directory in skills/ must be a valid skill',
    );

    for (const skill of skills) {
      const content = await fs.readFile(path.join(skill.path, 'SKILL.md'), 'utf8');
      const metadata = parseFrontmatter(content);
      assert.equal(metadata.name, skill.name, `${skill.name}: frontmatter name must match its directory`);
      assert.ok(metadata.description, `${skill.name}: description is required`);
      assert.ok(metadata.description.length <= 1024, `${skill.name}: description exceeds 1024 characters`);
    }
  });

  it('installs a shipped skill verbatim', async () => {
    const [skill] = await discoverSkills();
    const project = await tempDir('project');
    const { code } = await runCli(['install', skill.name], { cwd: project });
    assert.equal(code, ExitCode.SUCCESS);

    const installed = path.join(project, '.claude', 'skills', skill.name, 'SKILL.md');
    assert.deepEqual(await fs.readFile(installed), await fs.readFile(path.join(skill.path, 'SKILL.md')));
  });
});

describe('path handling', () => {
  it('locates the package and its skills registry', () => {
    assert.equal(getPackageRoot(), ROOT);
    assert.equal(getSkillsDirectory(), path.join(ROOT, 'skills'));
    assert.equal(getSkillPath('web-design'), path.join(ROOT, 'skills', 'web-design'));
  });

  it('resolves the project root from the working directory', () => {
    assert.equal(getProjectRoot(sandbox), path.resolve(sandbox));
    assert.equal(getProjectRoot(path.join(sandbox, 'a', '..')), path.resolve(sandbox));
  });

  it('resolves project and personal Claude directories', () => {
    const project = path.join(sandbox, 'project');
    assert.equal(getClaudeDirectory({ cwd: project }), path.join(project, '.claude'));
    assert.equal(getClaudeSkillsDirectory({ cwd: project }), path.join(project, '.claude', 'skills'));

    const configDir = path.join(sandbox, 'config');
    assert.equal(getClaudeDirectory({ scope: 'user', env: { CLAUDE_CONFIG_DIR: configDir } }), configDir);
    assert.equal(getClaudeDirectory({ scope: 'user', env: {} }), path.join(os.homedir(), '.claude'));
  });

  it('accepts lowercase kebab-case skill names', () => {
    for (const name of ['web-design', 'ui-design', 'seo', 'nextjs', 'design-systems', 'a'.repeat(64)]) {
      assert.equal(isValidSkillName(name), true, name);
    }
  });

  it('rejects unsafe or malformed skill names', () => {
    for (const name of [...INVALID_NAMES, '', undefined, null, 42]) {
      assert.equal(isValidSkillName(name), false, String(name));
      assert.throws(() => resolveSkillDirectory(sandbox, name), /Invalid skill name/);
    }
  });

  it('detects paths that escape their parent', () => {
    const parent = path.join(sandbox, 'parent');
    assert.equal(isPathInside(parent, path.join(parent, 'child')), true);
    assert.equal(isPathInside(parent, path.join(parent, 'a', 'b')), true);
    assert.equal(isPathInside(parent, parent), false);
    assert.equal(isPathInside(parent, path.join(parent, '..', 'sibling')), false);
    assert.equal(isPathInside(parent, path.join(parent, 'child', '..', '..')), false);
    assert.equal(isPathInside(parent, path.parse(parent).root), false);
    assert.equal(isPathInside(parent, path.join(sandbox, 'parent-sibling')), false);
  });
});
