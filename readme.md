# KNI Cascade

A modern front-end architecture creating a single source of truth for all our css - across WP, React, static, or any future builds.

We package:
- A revamped css folder structure and updated/modernized css base that fixes all inheritance issues.
- **Sass** for clean and familiar DX
- **PostCSS** to transform the compiled CSS into browser-ready output.
  - **[postcss-pxv](https://github.com/kni-labs/postcss-pxv)** — Our custom viewport unit (now 40% smaller!)
  - **Autoprefixer** (? to discuss)
  - **CSSNano** (?)
- **Stylelint** (config only?) to enforce code style and consistency across .scss files.
- **Prettier**  config file (that get pulled into each boilerplate)
- **config.js** Pulled into each boilerplate

### NPM Library or CSS Boilerplate?

The answer: why not both?

Currently everything in KNI-SCSS lives in npm modules. This is great for pushing updates but creates 2 main pain points:

1. No clear reference where to override variables
2. Our CSS boilerplates are still living in different places (kni-wp-bp, kni-next, etc)

I'm proposing that we split out css file into 2 main folders:
- **/engine**: (Lives in npm modules) - houses reset, mixins, functions, utility classes etc
- **/site**: (copied to appropriate location with a postinstall script) - css boilerplate housing tokens, primitives, base styling and normalized folder structure 

This allows this repo to truly be a single source of truth for all things css, and completely removes css from all boilerplates. Devs can dive in and start coding knowing exactly where to edit everything.
