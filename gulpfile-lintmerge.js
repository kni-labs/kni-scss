const gulp = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcsspxv = require('postcss-pxv');
const browserSync = require('browser-sync').create();
const {exec} = require('child_process'); // ✅ run Stylelint CLI

// Paths
const sassOutDir = './test';
const sassSrcDir = ['./test/test.scss']; // entry SCSS file
const sassWatchDir = [
  './scss/**/*.css',
  './scss/**/*.sass',
  './scss/**/*.scss',
  './site/**/*.scss',
  './test/**/*.sass',
  './test/**/*.scss',
];
const htmlWatchDir = './test/**/*.html';

// --------------------------
// Lint SCSS with Stylelint
// --------------------------
gulp.task('lint-css', function (done) {
  exec(
    'npx stylelint "scss/**/*.scss" "site/**/*.scss" "test/**/*.scss" --formatter=string',
    function (err, stdout, stderr) {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);

      // ✅ Don’t fail the build on lint warnings
      done();
    }
  );
});

// --------------------------
// Build SCSS
// --------------------------
gulp.task('build-sass', async function () {
  return await gulp
    .src(sassSrcDir)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([postcsspxv]))
    .pipe(gulpAutoprefixer())
    .pipe(
      rename((path) => {
        path.basename = 'test';
      })
    )
    .pipe(sourcemaps.write('./', {includeContent: true, sourceRoot: '../scss'}))
    .pipe(gulp.dest(sassOutDir))
    .pipe(browserSync.stream()) // ✅ inject final CSS
    .on('end', () => {
      console.log('✅ CSS compiled with sourcemaps + live reload');
    });
});

// --------------------------
// Serve + Watch
// --------------------------
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './test',
    },
    open: false,
    notify: false,
  });

  gulp.watch(sassWatchDir, gulp.series('lint-css', 'build-sass')); // lint before build
  gulp.watch(htmlWatchDir).on('change', browserSync.reload);
});

// --------------------------
// Tasks
// --------------------------
gulp.task('build', gulp.series('lint-css', 'build-sass'));
gulp.task('default', gulp.series('serve'));
