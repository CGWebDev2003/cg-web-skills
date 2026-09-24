# Skills

This directory is the registry for every CG Web Skill. It is shared by the Claude Plugin and the CLI:

- **Claude Plugin:** Claude Code loads skills from the plugin's `skills/` directory.
- **CLI:** `cg-web-skills list` and `cg-web-skills install <skill>` read from here.
- **npm:** this directory ships in the published package.

Available skills:

- [`cg-web-designer`](cg-web-designer/SKILL.md): end-to-end web design process, from intake and strategy to QA and launch
- [`cg-web-animate`](cg-web-animate/SKILL.md): premium web animation and motion systems
- [`cg-web-seo`](cg-web-seo/SKILL.md): technical SEO, search intent, content, structured data, and audits
- [`cg-web-geo`](cg-web-geo/SKILL.md): Generative Engine Optimization for AI search and answer systems
- [`cg-web-accessibility`](cg-web-accessibility/SKILL.md): WCAG 2.2 AA remediation and a native accessibility toolbar
- [`cg-web-deslopifier`](cg-web-deslopifier/SKILL.md): audits and redesigns AI-generated or template-driven websites for specificity and authorship
- [`cg-web-lighthouse-optimizer`](cg-web-lighthouse-optimizer/SKILL.md): turns Lighthouse JSON reports for mobile and desktop into fixes in the code

## Structure

Every skill is a directory with a `SKILL.md` file:

```text
skills/
└── <skill-name>/
    └── SKILL.md
```

A skill may add supporting resources when it needs them:

```text
skills/
└── <skill-name>/
    ├── SKILL.md
    ├── references/    Detailed documentation Claude reads on demand
    ├── examples/      Example code, markup, or output
    └── assets/        Templates, images, and other files
```

Only create these folders when the skill actually uses them.

## Naming

Skill names use **lowercase kebab-case**: lowercase letters, digits, and single hyphens, at most 64 characters. The directory name is the skill name.

Examples of the naming style (not yet created):

```text
web-design
ui-design
ux-design
frontend
animation
performance
conversion
```

## `SKILL.md`

`SKILL.md` follows the [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) format: YAML frontmatter followed by Markdown instructions.

```markdown
---
name: skill-name
description: What this skill does and when Claude should use it.
---

# Skill Name

Instructions for Claude…
```

- `name` must match the directory name.
- `description` tells Claude when to use the skill. `cg-web-skills list` also displays it.

Reference supporting files from `SKILL.md` with relative paths, for example `references/checklist.md`.

## How the CLI discovers skills

`cg-web-skills list` scans this directory at runtime. An entry is treated as a skill when:

1. it is a directory (not a file or symlink),
2. its name is valid lowercase kebab-case, and
3. it contains a `SKILL.md` file.

Everything else, including this README, is ignored. Adding a skill therefore requires no CLI changes.

`cg-web-skills install <skill>` copies the complete skill directory, unchanged, into `.claude/skills/<skill>/` (or `~/.claude/skills/<skill>/` with `--global`). Skill content is treated as data: nothing in a skill is ever executed by the CLI. Skills must contain only regular files and directories. Symlinks are rejected.
