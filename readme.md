# KNI SCSS

Our css starter pack and folder structure. The purpose of this repo is to have a single source of truth for all css used across, react, wordpress, static, or any future sites. When spinning up a new repo, please make sure it's using the latest version of this `scss` folder..

### Install

This project runs on Node v16. Install Node 16 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v16`. If using NVM, precede your `npm run` commands with `nvm use`.

Run `npm i` before running each NPM script to ensure that the project's dependencies are available and up to date.

### Develop

To spin up the sass dev environment for this project, run `npm run sass-dev`. This will compile and watch `./test/test.scss` for changes.

### Code Formatting

This project uses <a href="https://www.npmjs.com/package/prettier" target="_blank" rel="noopener noreferrer">prettier</a> and <a href="https://www.npmjs.com/package/stylelint" target="_blank" rel="noopener noreferrer">stylelint</a> for automatic code formatting and CSS linting. Prettier and stylelint can be run on the whole project at once by running `npm run prettier` and `npm run stylelint`. This project uses <a href="https://www.npmjs.com/package/husky" target="_blank" rel="noopener noreferrer">`husky`</a> and <a href="https://www.npmjs.com/package/lint-staged" target="_blank" rel="noopener noreferrer">`lint-staged`</a> to automatically run prettier and stylelint on staged files to format files before they are committed. If any errors are thrown from either library during the pre-commit process, git will output the errors and the commit will be blocked until the errors are fixed.

### Contributing

Contributions are welcome! Please either post an issue of a suggestion or open a pull request. Be sure to edit `testfile.html` to show clear example of code addition.

---

# Responsive Theory

Please take a moment to read more about our [Responsive Theory for Marketing Websites](https://docs.google.com/presentation/d/1go0-Oy6ae1wmr7yg-hsaIst86KB05vCQE_vc4dWv8Aw/edit?usp=sharing) (WIP).

tl;dr:

- Write mobile-first css
- Use 2 "zones" vs many breakpoints
- Scale everything
- Use Fluid Typography

### Mobile-first CSS:

Write all base styles in the mobile media query then overwrite as necessary for desktop(landscape). This will result in much less overwriting of code.

```scss
body {
  padding: 0 5%;

  @media (min-width: #{$sitePortraitFlip}px) {
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

The output becomes a flexible vw unit that changes as browser resizes. At `1280px` it should match up exactly to the comp.

Use the pixel sizes you see in Figma and wrap them in this function everywhere. The exception is if you want to use actual pixels, then use `px` or `rem(px)` and it will output fixed pixel sizes.

### Fluid Typography

We have 3 mixins to help with Accesible Fluid Typography.

#### fluidType()

Base mixin:

```scss
.item {
  @include fluidType($minFontSize, $maxFontSize, $minWidth, $maxWdith);
}
```

#### setType()

Use this for full Responsive Type automation. Great for headers or larger type.

```scss
h1 {
  @include setType(32, 48);
}
```

Takes only 2 arguments: `$fontSize--mobile` and `$fontSize--desktop`, then it automatically takes care of all responsive scaling based on your site settings.

#### defineType()

If you need a little more control, specifically with making sure type doens't get too small at smaller browser sizes use `definteType()` which allows you override the minium scaling size:

```scss
p {
  @include defineType(14, 16, $minMobileClamp: 14, $minDesktopClamp: 15);
}
```
