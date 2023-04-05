# KNI SCSS

Our css starter pack and folder structure. The purpose of this repo is to have a single source of truth for all css used across, react, wordpress, static, or any future sites. When spinning up a new repo, please make sure it's using the latest version of this `scss` folder..

### Install

This project runs on Node v16. Install Node 16 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v16`. If using NVM, precede your `npm run` commands with `nvm use`.

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
    padding: 0 15vw;
  }
}
```

### 2 Zones

Designs will have both portrait (mobile) designs and (desktop) designs delivered by the design team. In general these will be the sizes

- Mobile: `375px`
- Desktop: `1280px` (Sometimes `1440px`)

### Scale Everything

We're introducing a new `vw()` function which takes these sizes into account.

Input:

```scss
div {
  width: vw(320px);
}
```

Output:

```scss
div {
  width: 2.34375vw;
}
```

The output becomes a flexible vw unit that changes as browser resizes. At `$siteBasis--mobile`(375px) and `siteBasis--desktop`(1280px) it should match up exactly to the comp.

Use the pixel sizes you see in Figma and wrap them in this function everywhere. The exception is if you want to use actual pixels, then use `px` or `rem(px)` and it will output fixed pixel sizes.

Many times you'll only need `vw()` for desktop applications (then mobile gets something like 100%), but because mobile and desktop use different `siteBasis` vars, mobile usages will need the optional mobile argument:

Input:

```scss
div {
  width: vw(30px, mobile);

  @media (min-width: #{$tl}px) {
    width:vw(30px);
  }
```

Output:

```scss
div {
  width: 2.34375vw;

  @media (min-width: #{$tl}px) {
    width: 2.34375vw;
  }
```

### Fluid Typography

We have 2 mixins to help with Fluid Typography.

#### fluidType()

Base mixin:

```scss
.item {
  @include fluidType($minFontSize, $maxFontSize, $minWidth, $maxWidth);
}
```

#### setType()

This is superset of fluidType that should be used in most cases, and is great for Figma matching. Use this for fully responsive type automation. In most cases you only need to provide 2 arguments: The mobile size and the desktop size. **Note** these values are not the same as `fluidType`.

```scss
h1 {
  @include setType(32, 48);
}
```

Sometimes for smaller fonts you want to override the smallest size that it can go. In this case pass in the `$minClamp` argument which is the percentage the minimum font size should be compared to default size. Set it to `100%` to have it not scale any smaller than default size.

```scss
p {
  @include setType(14, 16, $minClamp: 94%);
}
.eyebrow {
  @include setType(11, 13, 100%);
}
```


### Spacing

Included are some default spacing values for layouts:

```
$spacing-01: vw(6px);
$spacing-02: vw(12px);
$spacing-03: vw(16px);
$spacing-04: vw(34px);
$spacing-05: vw(32px);
$spacing-06: vw(40px);
$spacing-07: vw(48px);
$spacing-08: vw(64px);
$spacing-09: vw(80px);
$spacing-10: vw(96px);
$spacing-11 vw(120);
$spacing-12: vv(160px);

$spacing-default: $spacing-07;
