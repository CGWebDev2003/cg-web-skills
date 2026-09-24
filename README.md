# CG Web Skills

Professional web design and web motion expertise for Claude, packaged as installable Agent Skills.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

CG Web Skills gives Claude the working methods of a senior web studio: how to plan a website before designing it, how to make it look specific instead of generic, and how to add motion that helps rather than distracts. You install the skills once, and Claude uses them automatically whenever you work on a website.

```bash
npx cg-web-skills install cg-web-designer
npx cg-web-skills install cg-web-animate
```

That's it. Open Claude Code in the same project and ask for what you need, for example _"Plan and build a website for my physiotherapy practice."_

---

## Contents

- [What are skills?](#what-are-skills)
- [The skillset](#the-skillset)
  - [`cg-web-designer`](#cg-web-designer)
  - [`cg-web-animate`](#cg-web-animate)
  - [How the skills work together](#how-the-skills-work-together)
- [Quick start](#quick-start)
- [Using the skills in Claude](#using-the-skills-in-claude)
- [CLI reference](#cli-reference)
- [Installing as a Claude Code plugin](#installing-as-a-claude-code-plugin)
- [Updating and removing skills](#updating-and-removing-skills)
- [FAQ](#faq)
- [For contributors](#for-contributors)
- [License](#license)

---

## What are skills?

[Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) are folders of instructions that Claude loads on demand. Each skill has a `SKILL.md` file whose description tells Claude _when_ the skill is relevant. When your request matches, Claude reads the skill and follows it. When it doesn't, the skill stays out of the way and costs nothing.

In practice, that means you don't have to paste long prompts about accessibility, easing curves, or content strategy into every conversation. The skills bring that knowledge with them.

## The skillset

| Skill | Role | Use it for |
| ----- | ---- | ---------- |
| [`cg-web-designer`](skills/cg-web-designer/SKILL.md) | Lead web designer, UX and content strategist, frontend quality lead | Planning, designing, building, reviewing, and launching websites and landing pages |
| [`cg-web-animate`](skills/cg-web-animate/SKILL.md) | Senior design engineer and motion designer | Designing, implementing, reviewing, and optimizing animations and motion systems |

### `cg-web-designer`

The end-to-end web design skill. It treats every request like a small studio engagement instead of jumping straight to a homepage.

**What Claude does with it**

- **Starts by reducing uncertainty.** Before any code, Claude clarifies the site's purpose, audience, primary action, content, and constraints. A vague brief like _"make it modern and premium"_ gets translated into concrete design rules, with follow-up questions where needed.
- **Works through a real process:**

  ```text
  Intake → Discovery → Strategy → Content → Information Architecture → UX/Wireframes
  → Design Direction → Design System → Visual Design → Prototype/Test → Engineering
  → QA → Launch → Iteration
  ```

- **Designs content first.** Structure and copy come before visual composition, so the layout serves the message.
- **Builds a design system.** Tokens for color, type, spacing, and components, so the site stays consistent as it grows.
- **Covers the quality basics:** responsive design, accessibility (WCAG 2.2), performance (Core Web Vitals), SEO, QA, launch checklist, and handoff.
- **Audits against "AI slop".** Claude checks the result against the generic defaults of AI-generated websites (interchangeable hero sections, decorative gradients, filler cards, and so on) and removes them.
- **Never invents facts.** Prices, testimonials, statistics, certifications, team members, and legal text are never made up. Unknowns are marked and asked for.

It also handles redesigns of existing sites and has a defined fallback when you say _"just build it"_.

**Example prompts**

- _"I need a website for my architecture firm. Where do we start?"_
- _"Redesign this landing page. It feels generic."_
- _"Review my homepage for accessibility, performance, and SEO before launch."_
- _"Create a design system for this project."_

### `cg-web-animate`

The motion skill. Its core rule: **every animation must have a reason to exist.** Claude uses motion to communicate hierarchy, spatial continuity, feedback, and brand, not as decoration added at the end.

**What Claude does with it**

- **Decides whether to animate at all**, then picks the simplest technology that does the job: CSS, Web Animations API, View Transitions, native scroll-driven animations, GSAP, Motion (Framer Motion), Lottie, Rive, SVG, Canvas, or WebGL.
- **Uses a consistent motion system:** easing rules, a timing scale, stagger, and motion tokens instead of one-off values.
- **Knows the common patterns:** hero entrances, text reveals and masks, scroll reveals and choreography, parallax, hover and micro-interactions, page transitions, loading states, skeletons, marquees, cursor effects, and SVG animation.
- **Keeps it accessible:** respects `prefers-reduced-motion` (in CSS and JavaScript), keyboard focus, and flashing-content limits.
- **Keeps it fast:** animates compositor-friendly properties, avoids unnecessary layout animation, uses `will-change` sparingly, and prevents flashes of unstyled content.
- **Follows framework rules** for React/Next.js and GSAP, including cleanup and responsive motion.
- **Reviews its own work** with a motion review process and checklist, and avoids "AI animation slop" such as fading everything in on scroll.

**Example prompts**

- _"Add a premium hero entrance to this page."_
- _"Our scroll animations feel cheap. Review and fix them."_
- _"Build a page transition between the project list and project detail in Next.js."_
- _"Make these buttons feel more responsive."_

### How the skills work together

The two skills are independent. Install one or both.

When both are installed, `cg-web-designer` leads the project and treats motion as part of the design direction, while `cg-web-animate` supplies the detailed motion craft when animations are designed or built. You don't need to call them explicitly; Claude picks whichever fits the task.

---

## Quick start

**Requirements:** Node.js 20 or later, and [Claude Code](https://code.claude.com/docs) (or another environment that supports Agent Skills).

1. **Go to your project.**

   ```bash
   cd my-website
   ```

2. **See which skills are available.**

   ```bash
   npx cg-web-skills list
   ```

3. **Install the skills you want.**

   ```bash
   npx cg-web-skills install cg-web-designer
   npx cg-web-skills install cg-web-animate
   ```

   The skills are copied to `.claude/skills/` in your project. Commit that folder to share the skills with your team.

4. **Start Claude Code in the project and describe what you want.**

Prefer to have the skills in every project? Install them globally instead:

```bash
npx cg-web-skills install cg-web-designer --global
```

## Using the skills in Claude

**Automatically.** Just describe your task. Claude matches it against each skill's description and loads the skill when it fits. Asking for a website, a redesign, a landing page review, a hover effect, or a scroll animation is enough.

**Explicitly.** In Claude Code, skills are also available as slash commands. Type `/cg-web-designer` or `/cg-web-animate` to invoke one directly, or simply mention the skill by name in your prompt.

**Checking that it works.** Ask Claude _"Which skills do you have available?"_ in the project. The installed CG Web Skills should be listed.

---

## CLI reference

The CLI is a small, dependency-free Node.js tool. Its only job is to copy skill folders into the right place, so Claude can find them.

You can run it without installing anything:

```bash
npx cg-web-skills <command>
```

Or install it globally and call it directly:

```bash
npm install --global cg-web-skills
cg-web-skills <command>
```

### Commands

| Command / option  | Description |
| ----------------- | ----------- |
| `list`            | Lists every skill shipped in the package, with a short description. |
| `install <skill>` | Copies `skills/<skill>/` into `.claude/skills/<skill>/` in the current project. Creates `.claude/skills/` if needed. |
| `init`            | Creates `.claude/skills/` in the current project without installing anything. Optional, and safe to re-run. |
| `help`            | Shows help. |
| `-g, --global`    | For `install` and `init`: use your personal Claude directory instead of the project. |
| `-v, --version`   | Shows the version. |
| `-h, --help`      | Shows help. |

Running `cg-web-skills` without a command (or with `--help`) shows the help. In a terminal at least 94 columns wide it opens with the CG Web Skills banner; in narrower terminals and when the output is piped, it prints a plain title instead.

### Where skills are installed

| Scope | Directory | Available in |
| ----- | --------- | ------------ |
| Project (default) | `<project>/.claude/skills/<skill>/` | This project only. Can be committed and shared with your team. |
| Personal (`--global`) | `~/.claude/skills/<skill>/` | All your projects. |

With `--global`, the personal Claude directory is `$CLAUDE_CONFIG_DIR` when that variable is set, otherwise `~/.claude`.

### What a session looks like

```console
$ npx cg-web-skills list
Available skills:

  cg-web-animate   Expert skill for designing, implementing, reviewing, and optimizing premium web animations and moti…
  cg-web-designer  Lead web designer, UX strategist, content strategist, and frontend quality lead for professional we…

Install a skill with `cg-web-skills install <skill>`.

$ npx cg-web-skills install cg-web-designer
✔ Installed cg-web-designer to .claude/skills/cg-web-designer

$ npx cg-web-skills install cg-web-designer
✖ Skill "cg-web-designer" is already installed at .claude/skills/cg-web-designer

Remove the existing directory first if you want to reinstall it.
```

### Safety

- The CLI only copies files. Skill contents are treated as data and are never executed or modified.
- It never overwrites an existing installation.
- Skill names must be lowercase kebab-case. Anything else, including `..`, path separators, and absolute paths, is rejected, so a name can never write outside the skills directory.
- Skills containing symlinks or other special files are refused.

### Exit codes

| Code | Meaning |
| ---- | ------- |
| `0`  | Success |
| `1`  | General error (for example: skill not found, already installed) |
| `2`  | Invalid usage (for example: unknown command or option, missing or invalid skill name) |

---

## Installing as a Claude Code plugin

The repository is also a Claude Code plugin (see [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json)). Instead of copying individual skills, you can load all of them at once:

```bash
git clone https://github.com/CGWebDev2003/cg-web-skills.git
claude --plugin-dir ./cg-web-skills
```

Claude Code discovers every skill in the plugin's `skills/` directory. New skills appear automatically after you pull the latest version.

## Updating and removing skills

Installed skills are plain folders, so managing them is a matter of files:

- **Remove:** delete `.claude/skills/<skill>/` (or `~/.claude/skills/<skill>/` for a global install).
- **Update:** remove the folder, then install again with the latest version:

  ```bash
  rm -rf .claude/skills/cg-web-designer
  npx cg-web-skills@latest install cg-web-designer
  ```

The CLI never overwrites an existing skill, so local changes you made to a skill are never lost by accident.

## FAQ

**Do I need the CLI?**
No. The CLI is a convenience. You can copy any folder from [`skills/`](skills/) into `.claude/skills/` yourself, or load the repository as a plugin.

**Does installing a skill change my project?**
Only by adding a folder under `.claude/skills/`. Nothing else is touched, and nothing is executed.

**Can I customize a skill?**
Yes. After installing, the skill is a normal Markdown file in your project. Edit `SKILL.md` to match your team's conventions.

**Will more skills be added?**
Yes. The skillset grows over time. New skills show up in `cg-web-skills list` and in the plugin automatically.

---

## For contributors

```text
cg-web-skills/
├── .claude-plugin/plugin.json   Plugin manifest
├── skills/                      Skills registry (one folder per skill)
├── src/
│   ├── cli.js                   Entry point and argument parsing
│   ├── commands/                init, install, list
│   └── utils/                   logger, paths, exit codes
└── tests/                       Node.js built-in test runner
```

- `skills/` is the single registry, shared by the plugin, the CLI, and the npm package.
- The CLI discovers skills by scanning `skills/`, so adding a skill needs no code changes.
- Skill conventions (naming, `SKILL.md` format, optional `references/`, `examples/`, `assets/`) are documented in [`skills/README.md`](skills/README.md).

```bash
npm install
npm test
node src/cli.js --help
npm pack --dry-run   # Inspect the package as it would be published
```

### Releasing

1. Bump the version in `package.json`, `package-lock.json`, and `.claude-plugin/plugin.json` (a test checks that they match).
2. Merge the change into `main`.
3. Publish a GitHub release whose tag is the version prefixed with `v`, for example `v1.1.0`.

The [publish workflow](.github/workflows/publish.yml) then runs the tests and publishes the package to npm using [trusted publishing](https://docs.npmjs.com/trusted-publishers), so no npm token is stored in the repository. `npm publish` also runs the tests locally before uploading.

CG Web Skills is an independent open-source project. It is not affiliated with Anthropic and is not listed in any official Claude marketplace.

## License

[MIT](LICENSE) © Colin Grahm
