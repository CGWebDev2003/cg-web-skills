# CLAUDE.md

## Versioning

Every change that reaches `main` gets a version bump in the same branch, following semantic versioning:

- **Patch** (`1.1.1` → `1.1.2`): fixes, README and documentation changes, skill wording tweaks
- **Minor** (`1.1.2` → `1.2.0`): new skills, new CLI commands or options, other backwards-compatible features
- **Major** (`1.2.0` → `2.0.0`): breaking changes to the CLI, the install layout or the lockfile format

The version lives in three places, and they must always match:

- `package.json`
- `package-lock.json` (updated automatically by the command below)
- `.claude-plugin/plugin.json`

Bump it with `npm version <x.y.z> --no-git-tag-version`, then set the same version in `.claude-plugin/plugin.json` by hand. Commit it as `Release <x.y.z>`.

Do not create tags or GitHub releases yourself. Publishing a GitHub release with the tag `v<x.y.z>` triggers `.github/workflows/publish.yml`, which publishes to npm and fails if the tag does not match `package.json`.

## Package contents

Only `src/`, `skills/`, `.claude-plugin/`, `package.json`, `README.md` and `LICENSE` belong in the npm package. Anything else, such as `assets/` (README images), goes in `.npmignore`. Check with `npm pack --dry-run`.

## Tests

Run `npm test` before every commit. It also runs automatically before `npm publish`.
