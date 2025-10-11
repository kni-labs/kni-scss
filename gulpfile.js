const gulp = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcsspxv = require('postcss-pxv');
const browserSync = require('browser-sync').create();
const {exec} = require('child_process'); // stylelint via CLI

// --------------------------
// Paths
// --------------------------
const sassOutDir = './test'; // compiled CSS lives here
const sassSrcDir = ['./test/styles.scss']; // entry point
const sassWatchDir = ['./scss/**/*.scss', './test/**/*.scss'];
const htmlWatchDir = './test/**/*.html';
const colors = require('ansi-colors');
// --------------------------
// Lint SCSS (non-blocking)
// --------------------------


gulp.task('lint-css-fix', function (done) {
  exec(
    'npx stylelint "scss/**/*.scss" "test/**/*.scss" --config .stylelintrc --fix --formatter string',
    function (err, stdout, stderr) {
      if (stdout) {
        // Highlight key tokens
        const coloredOutput = stdout
          .replace(/✖/g, colors.red('✖'))
          .replace(/⚠️/g, colors.yellow('⚠️'))
          .replace(/\.scss/g, colors.cyan('.scss'))
          .replace(/\(\S+\)/g, match => colors.dim(match)); // rule name in dim gray
        console.log(coloredOutput);
      }

      if (stderr) console.error(colors.red(stderr));

      if (err) {
        console.log(colors.yellow('⚠️  Stylelint fixed some issues (non-blocking)'));
      } else {
        console.log(colors.green('✅  Stylelint clean — all formatting issues resolved'));
      }

      done();
    }
  );
});

// --------------------------
// Build SCSS → CSS
// --------------------------
gulp.task('build-sass', async function () {
  return await gulp
    .src(sassSrcDir)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(
      postcss([
        postcsspxv({
          siteMin: 0,
          siteBasis: 375,
          siteMax: 767,
          vars: {
            min: '--site-min',
            basis: '--site-basis',
            max: '--site-max',
            unit: '--pxv-unit',
          },
          writeVars: false, // set to true if you want :root vars injected
        }),
      ])
    )
    .pipe(gulpAutoprefixer())
    .pipe(
      sourcemaps.write('./', {
        includeContent: true,
        sourceRoot: '../scss',
      })
    )
    .pipe(gulp.dest(sassOutDir))
    .pipe(browserSync.stream())
    .on('end', () =>
      console.log(
        '✅ Built styles.scss → test/styles.css with sourcemaps + live reload'
      )
    );
});

// --------------------------
// Serve + Watch
// --------------------------
gulp.task('serve', gulp.series('lint-css-fix', function () {
  browserSync.init({
    server: {baseDir: './test'},
    open: false,
    notify: false,
  });

  gulp.watch(sassWatchDir, gulp.series('lint-css-fix', 'build-sass'));
  gulp.watch(htmlWatchDir).on('change', browserSync.reload);
}));

// --------------------------
// Tasks
// --------------------------
gulp.task('build', gulp.series('lint-css-fix', 'build-sass'));
gulp.task('default', gulp.series('serve'));
