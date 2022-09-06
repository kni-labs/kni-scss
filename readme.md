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

Please take a moment to read more about our [Resopnsive Theory for Marketing Websites](https://docs.google.com/presentation/d/1go0-Oy6ae1wmr7yg-hsaIst86KB05vCQE_vc4dWv8Aw/edit?usp=sharing) (WIP).

tl;dr:
 - Write mobile-first css
 - Use 2 "zones" vs many breakpoints
 - Scale everything
 - Use Accessible Fluid Typography
 
 ### Mobile-first CSS:
 Write all base styles in the mobile media query then overwite as neccessary for desktop(landscape). This will result in much less overwriting of code.
 
 ```css
 body {
  padding: 0 5%;

  @media (min-width: rem($tp)) {
    padding: 0 15vw;}
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


 ### Accessible Fluid Typography
 
 Along with widths, padding, margin, gutters, etc, we need a way to have fully fluid typography as well. 
 
 Typgraphy will now use the clamp function to set a minimum size, default favlue, and maximum size. We will set `rem` units for `min` and `max` and use `rem + vw` for the main value. This allows the type to still be browser zoomable for accessibilty purposes.
 
Usage:
Call `%fluidType` as an extend all elements that you wish to be fluid:
 
 ```scss
 p, h1, h2, h3, h4, h5, h6, code, input {
    @extend %fluid-type
 }
 ```
 
Then update custom properties on an element by element basis:

```scss
p {
  --fontMin: 14;
  --fontSize: 14;
  --fontMax: 22;
 
 @media (min-width: rem($tp)) {
    --fontSize: 16;
}
```
In the above example text on mobile will be 14px that scales fluidly up to `22px`, but never get smaller than `14px`. The desktop size will be fluid at `16px` scaling up to `20px` and down as low as `12.8px`. 

You can always overwrite any of the values but the mixin contains sensible defaults so for the most part you only need to provide a mobile and desktop value:

```scss
h1  {
  --fontSize: 43;

  @media (min-width: rem($tp)) {
    --fontSize: 56;
  }
}
```

Hit up Daniel with questions.  (More readme coming soon.)
