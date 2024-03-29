# KNI SCSS

Our css starter pack and folder structure. The purpose of this repo is to have a single source of truth for all css used across, react, wordpress, static, or any future sites. When spinning up a new repo, please make sure it's using the latest version of this `scss` folder.

### Install

This project runs on Node v18. Install Node 18 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v18`. If using NVM, precede your `npm run` commands with `nvm use`.

Run `npm i` before running each NPM script to ensure that the project's dependencies are available and up to date.

### Develop

To spin up the sass dev environment for this project, run `npm run gulp`. This will compile and watch `./test/test.scss` and watch the `./scss` directory for sass changes.

### Code Formatting

This project uses <a href="https://www.npmjs.com/package/prettier" target="_blank" rel="noopener noreferrer">prettier</a> and <a href="https://www.npmjs.com/package/stylelint" target="_blank" rel="noopener noreferrer">stylelint</a> for automatic code formatting and CSS linting. Prettier and stylelint can be run on the whole project at once by running `npm run prettier` and `npm run stylelint`. This project uses <a href="https://www.npmjs.com/package/husky" target="_blank" rel="noopener noreferrer">`husky`</a> and <a href="https://www.npmjs.com/package/lint-staged" target="_blank" rel="noopener noreferrer">`lint-staged`</a> to automatically run prettier and stylelint on staged files to format files before they are committed. If any errors are thrown from either library during the pre-commit process, git will output the errors and the commit will be blocked until the errors are fixed.

### Contributing

Contributions are welcome! Please either post an issue of a suggestion or open a pull request. Be sure to edit `test/index.html` to show clear example of code addition.

---

# Responsive Theory

Will post more on our responsive theory soon, but for now:

- Write mobile-first css
- Use 2 "zones" vs many breakpoints
- Scale everything
- Use Fluid Typography

### Mobile-first CSS:

Write all base styles then overwrite as necessary for desktop(landscape). This will result in much less overwriting of code. Mobile media queries should be rare.

```scss
body {
  padding: 0 5%;

  @media (min-width: #{$tp}px) {
    padding: 0 15pxv;
  }
}
```

### 2 Zones

Designs will have both portrait (mobile) designs and (desktop) designs delivered by the design team. In general these will be the sizes

- Mobile: `375px`
- Desktop: `1440px`

### Scale Everything

We will be using the [postcss-pxv plugin](https://github.com/kni-labs/postcss-pxv) for viewport unit conversions.

input:

```css
div {
  width: 150pxv;
}
```

output:

```css
div {
  width: clamp(
    1px,
    calc(150vw * (100 / var(--siteBasis))),
    calc(150px * var(--siteMax) / var(--siteBasis))
  );
}
```

### Fluid Typography

A fluid typography approach harnessing the power of css custom properties.

Example

```css
.h-xxl {
  --fontSize: 38;

  @media (min-width: #{$tl}px) {
    --fontSize: 50;
  }
}
```

Example with clamp:

```css
.body-m {
  --fontSize: 14;
  --fontSizeMinClamp: 12;

  @media (min-width: #{$tl}px) {
    --fontSize: 16;
    --fontSizeMinClamp: 14;
  }
}
```

### Spacing

Included are some default spacing values for layouts. These can be overwritten on a project-basis, but we will mostly use these values on all projects.

```
$spacing-01: 6pxv;
$spacing-02: 12pxv;
$spacing-03: 16pxv;
$spacing-04: 34pxv;
$spacing-05: 32pxv;
$spacing-06: 40pxv;
$spacing-07: 48pxv;
$spacing-08: 64pxv;
$spacing-09: 80pxv;
$spacing-10: 96pxv;
$spacing-11: 120pxv;
$spacing-12: 160pxv;
$spacing-default: $spacing-07;
```
