const gulp = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const purgeSourcemaps = require('gulp-purge-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
// TODO: postcss pxv support

const sassOutDir = './test';
const sassSrcDir = ['./test/test.scss'];
const sassWatchDir = [
  './scss/**/*.css',
  './scss/**/*.sass',
  './scss/**/*.scss',
  './test/**/*.sass',
  './test/**/*.scss',
];

gulp.task('build-sass', async function () {
  return await gulp
    .src(sassSrcDir)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(purgeSourcemaps())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename((path) => (path.basename = 'test')))
    .pipe(gulpAutoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassOutDir));
});

gulp.task('watch-sass', async function () {
  return await gulp.watch(sassWatchDir, gulp.series('build-sass'));
});

gulp.task('build', gulp.series('build-sass'));
gulp.task('default', gulp.series('watch-sass', 'build-sass'));
