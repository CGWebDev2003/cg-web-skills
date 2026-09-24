# CG Web Skills

A professional Claude skillset for designing, building, and optimizing modern, high-quality websites.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Status:** early foundation (`0.1.0`). This release sets up the infrastructure: the Claude Plugin, the skills registry, the CLI, and npm distribution. The individual skills will be added in upcoming releases.

## What is CG Web Skills?

CG Web Skills will be a growing collection of specialized [Claude Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) that cover the complete website creation process:

- UX, UI, and visual design
- Design systems
- Frontend development and Next.js
- Animation, motion, and interaction design
- Responsive design and accessibility
- SEO, performance, and conversion optimization
- Web copy
- Technical implementation and code quality

Each skill is a self-contained folder of instructions, references, examples, and assets that Claude loads when it is relevant to the task at hand.

## Installation

Run the CLI without installing anything:

```bash
npx cg-web-skills
```

Or install it globally:

```bash
npm install --global cg-web-skills
```

Requires Node.js 20 or later.

## CLI

```bash
cg-web-skills init              # Prepare the current project (.claude/skills/)
cg-web-skills list              # List available skills
cg-web-skills install <skill>   # Install a skill into the current project
```

| Command / option  | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `init`            | Creates `.claude/skills/` in the current project. Safe to re-run.  |
| `list`            | Lists every skill shipped in this package.                         |
| `install <skill>` | Copies `skills/<skill>/` to `.claude/skills/<skill>/`.             |
| `help`            | Shows help.                                                        |
| `-g, --global`    | For `init` and `install`: use your personal `~/.claude/` instead.  |
| `-v, --version`   | Shows the version.                                                 |
| `-h, --help`      | Shows help.                                                        |

With `--global`, the personal Claude directory is `$CLAUDE_CONFIG_DIR` when that variable is set, otherwise `~/.claude`.

### Safety

- Skill names must be lowercase kebab-case. Anything else, including `..`, path separators, and absolute paths, is rejected.
- Skills are copied verbatim as data. Their files are never executed or modified.
- Skills containing symlinks or other special files are refused.
- An existing installation is never overwritten. Remove it first to reinstall.

### Exit codes

| Code | Meaning       |
| ---- | ------------- |
| `0`  | Success       |
| `1`  | General error |
| `2`  | Invalid usage |

## Architecture

```text
CG Web Skills
│
├── Claude Plugin      .claude-plugin/plugin.json
├── Skills             skills/<skill-name>/SKILL.md
├── CLI                src/cli.js → init · list · install
└── npm distribution   package.json (bin: cg-web-skills)
```

- **Claude Plugin:** the repository root is a Claude Code plugin. Claude Code discovers skills from the plugin's `skills/` directory automatically.
- **Skills:** `skills/` is the single registry. Each skill is a directory containing a `SKILL.md` file, following the Agent Skills format.
- **CLI:** a small, dependency-free Node.js CLI. It discovers skills by scanning `skills/`, so new skills need no CLI changes.
- **npm distribution:** the package ships the CLI together with the `skills/` registry, so `npx cg-web-skills` always has the skills it lists.

```text
cg-web-skills/
├── .claude-plugin/plugin.json   Plugin manifest
├── skills/                      Skills registry
├── src/
│   ├── cli.js                   Entry point and argument parsing
│   ├── commands/                init, install, list
│   └── utils/                   logger, paths, exit codes
└── tests/                       Node.js built-in test runner
```

## Skills

Skills are added progressively under [`skills/`](skills/). Each one follows the same layout:

```text
skills/
└── <skill-name>/
    ├── SKILL.md       Required: frontmatter metadata and instructions
    ├── references/    Optional
    ├── examples/      Optional
    └── assets/        Optional
```

See [`skills/README.md`](skills/README.md) for the conventions.

## Development

```bash
npm install
npm test
node src/cli.js --help
node src/cli.js list
node src/cli.js init
```

To try the package as it would be published:

```bash
npm pack --dry-run
```

## Status

This initial release establishes the infrastructure only. No skills are included yet; `cg-web-skills list` reports that none are available. Individual skills will be added progressively, and each one will appear in the CLI and the Claude Plugin automatically.

CG Web Skills is an independent open-source project. It is not affiliated with Anthropic and is not listed in any official Claude marketplace.

## License

[MIT](LICENSE) © Colin Grahm
