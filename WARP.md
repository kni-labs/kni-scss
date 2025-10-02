# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

KNI SCSS is a CSS starter pack and folder structure designed to be a single source of truth for all CSS across React, WordPress, static sites, and future projects. It implements a mobile-first, two-zone responsive design system with viewport-based scaling.

## Common Commands

### Development
- `npm run gulp` - Start development environment (compiles and watches `./test/test.scss` and `./scss` directory)
- `npm run build` or `npm run gulp-build` - Build SCSS to CSS (production build)
- `npm run serve` - Serve test files via HTTP server from the test directory

### Code Quality
- `npm run eslint` - Lint JavaScript files with auto-fix
- `npm run stylelint` - Lint CSS/SCSS files with auto-fix  
- `npm run prettier` - Format all files with Prettier
- `npm run deploy` - Run all linting and build steps (eslint → stylelint → build)

### Testing
The `test/` directory contains HTML files and test SCSS for development:
- `test/index.html` - Main test page
- `test/stress-test.html` - Performance testing page
- `test/test.scss` - Test SCSS file that imports the main library

## Architecture & Structure

### SCSS Organization
The SCSS follows a modular ITCSS-inspired architecture:

```
scss/
├── global.scss              # Main entry point
├── 01-config/              # Configuration layer
│   ├── 01-variables/       # Breakpoints, colors, fonts, other vars
│   ├── 02-functions/       # Sass functions (em, rem, aspectRatio)
│   └── 03-mixins/          # Reusable mixins
└── 02-base/               # Base styles layer
    ├── 01-imports/        # External imports
    ├── 02-normalize/      # CSS reset/normalize
    ├── 03-structure/      # Base structural styles
    ├── 04-type/          # Typography base
    └── 05-utilities/     # Utility classes
```

### Responsive System
- **Mobile-first approach**: Write base styles for mobile, then enhance for desktop
- **Two-zone system**: Mobile (375px) and Desktop (1440px) designs
- **Viewport scaling**: Uses `postcss-pxv` plugin for `pxv` units that scale fluidly
- **Fluid typography**: CSS custom properties with `--fontSize` variables

### Key Breakpoints
```scss
$ms: 320   // Mobile small
$mm: 375   // Mobile medium  
$ml: 500   // Mobile large
$ts: 600   // Tablet small
$tm: 768   // Tablet medium
$tl: 1024  // Tablet large (main desktop breakpoint)
$ds: 1280  // Desktop small
$dm: 1440  // Desktop medium
$dl: 1600  // Desktop large
$dxl: 1800 // Desktop x-large
```

### Viewport Units (pxv)
The system uses a custom `pxv` unit via postcss-pxv that converts to fluid `clamp()` values:
- Input: `width: 150pxv;`
- Output: `width: clamp(1px, calc(150vw * (100 / var(--siteBasis))), calc(150px * var(--siteMax) / var(--siteBasis)));`

### Typography Mixins
Typography is handled through mixins that set `--fontSize` custom properties:
- `@include h-xxl;` through `@include h-xs;` for headings
- `@include body-l;`, `@include body-m;`, `@include body-xs;` for body text
- Includes responsive scaling and optional clamp values

### Spacing System
Uses predefined spacing variables with `pxv` units:
```scss
$spacing-01: 6pxv;   // through $spacing-12: 160pxv;
$spacing-default: $spacing-07; // 48pxv
```

## Development Notes

### Node Version
- Requires Node v16-20 (engines constraint in package.json)
- NPM v8-10 required

### Build Process
- Gulp-based build system compiles `test/test.scss` 
- Includes autoprefixer, sourcemaps, and postcss-pxv processing
- Output compressed CSS to `test/test.css`

### Pre-commit Hooks
- Husky + lint-staged automatically run prettier and stylelint on staged files
- Commits blocked if linting errors exist

### Version Updates
All pull requests must update both `package.json` and `package-lock.json` versions.