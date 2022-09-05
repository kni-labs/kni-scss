# KNI SCSS

Our css starter pack and folder structure.

### Install

This project runs on Node v16. Install Node 16 to run this project or install <a href="https://github.com/nvm-sh/nvm#install--update-script" target="_blank" rel="noopener noreferrer">NVM</a> and run `nvm install v16`. If using NVM, precede your `npm run` commands with `nvm use`.

Run `npm i` before running each NPM script to ensure that the project's dependencies are available and up to date.

### Develop

To spin up the sass dev environment for this project, run `npm run sass-dev`. This will compile and watch `./test/test.scss` for changes.

### Code Formatting

This project uses <a href="https://www.npmjs.com/package/prettier" target="_blank" rel="noopener noreferrer">prettier</a> and <a href="https://www.npmjs.com/package/stylelint" target="_blank" rel="noopener noreferrer">stylelint</a> for automatic code formatting and CSS linting. Prettier and stylelint can be run on the whole project at once by running `npm run prettier` and `npm run stylelint`. This project uses <a href="https://www.npmjs.com/package/husky" target="_blank" rel="noopener noreferrer">`husky`</a> and <a href="https://www.npmjs.com/package/lint-staged" target="_blank" rel="noopener noreferrer">`lint-staged`</a> to automatically run prettier and stylelint on staged files to format files before they are committed. If any errors are thrown from either library during the pre-commit process, git will output the errors and the commit will be blocked until the errors are fixed.

### Contributing

Contributions are welcome! Please either post an issue of a suggestion or open a pull request. Be sure to edit `testfile.html` to show clear example of code addition.
