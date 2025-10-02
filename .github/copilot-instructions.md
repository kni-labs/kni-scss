<!-- .github/copilot-instructions.md -->
# KNI SCSS — AI agent guidance

This file gives concise, repository-specific instructions for AI coding agents working on the KNI SCSS starter pack. Focus on discoverable patterns, concrete commands, and examples from the codebase.

1. Purpose and big picture
- This repo is a CSS/SCSS starter: `scss/` is the single source of truth. `scss/global.scss` imports the config and base layers.
- Mobile-first, two-zone responsive system (mobile ~375px, desktop ~1440px). Viewport scaling uses `postcss-pxv` and a custom `pxv` unit.

2. Common developer workflows (commands)
- Install: `npm i` (Node 18 recommended, see `.nvmrc`).
- Dev/watch: `npm run gulp` — starts gulp watch and compiles `test/test.scss` to `test/test.css`.
- Build (one-off): `npm run gulp-build` or `npm run build`.
- Serve test pages: `npm run serve` (runs `http-server` in `test/`).
- Format / lint: `npm run prettier`, `npm run stylelint`, `npm run eslint`.

3. Build details agents must know
- Gulp task `build-sass` compiles `test/test.scss` (entry) → `test/test.css` (output). Key pipeline: sourcemaps, sass (dart-sass), autoprefixer, postcss with `postcss-pxv`.
- Watch globs: `./scss/**/*.{css,sass,scss}` and `./test/**/*.{sass,scss}` (see `gulpfile.js`).
- Node engine range in `package.json`: Node >=16 <21. `.nvmrc` contains `18`.

4. Project-specific patterns & conventions
- Folder layout: `01-config` (variables, functions, mixins) → `02-base` (imports, normalize, structure, type, utilities). Use this order when adding new files.
- Fluid typography: mixins set `--fontSize` custom properties (see `scss/02-base/04-type/_index.scss` and `01-config/03-mixins/_03-content.scss`). Prefer setting custom properties over hard-coded px sizes.
- Breakpoints variables live in `01-config/01-variables/_01-breakpoints.scss`. Use `$tl` (1024) as the main desktop breakpoint.
- pxv usage: code uses `pxv` units (configured in `stylelint` to be allowed). When adding layout sizes, prefer `pxv` for scalable values; postcss-pxv transforms them in the pipeline.
- Utility classes: placed in `02-base/05-utilities/*`. Keep small, single-responsibility utilities here.

5. Tests and examples
- `test/test.scss` imports `scss/global.scss` and contains many examples; `test/index.html` and `test/stress-test.html` are live examples. Use them to validate visual changes.

6. Editing and QA guidance for changes
- When changing SCSS, run `npm run gulp` or `npm run gulp-build` and review `test/test.css` and `test/index.html`.
- Run `npm run stylelint` and `npm run prettier` before committing. Husky + lint-staged will also run these on staged files.
- Update `package.json` and `package-lock.json` version fields for release PRs (see `pull_request_template.md`).

7. Files to inspect for context when asked
- `gulpfile.js` — build/watch logic
- `package.json`, `.nvmrc` — Node/npm constraints and scripts
- `scss/global.scss` — top-level entry
- `scss/01-config/*` — variables, functions, mixins (em/rem helpers, breakpoints)
- `scss/02-base/*` — base styles and utilities
- `test/*` — quick visual smoke tests

8. Quick examples for agents
- Add a new variable: put it in `scss/01-config/01-variables/_index.scss` or into a dedicated file under `01-variables/` and import it from `_index.scss`.
- Add a new utility class: create `scss/02-base/05-utilities/01-classes/_your-utility.scss` and import in `01-classes/_index.scss`.
- To test locally: `npm i && npm run gulp` then open `test/index.html` in browser or `npm run serve` and visit `http://localhost:8080`.

9. What not to change without explicit intent
- Don’t change the pxv pipeline (postcss-pxv) unless you update `gulpfile.js` and validate output clamps in `test/test.css`.
- Avoid reorganizing the ITCSS-like folder ordering without a migration note — many imports assume the current index/import structure.

If any section is unclear or you need examples added, tell me which area to expand and I will iterate.
