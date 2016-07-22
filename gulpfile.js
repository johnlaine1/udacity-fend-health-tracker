'use strict';

// Load our dependencies.
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var requirejsOptimize = require('gulp-requirejs-optimize');
var htmlMin = require('gulp-htmlmin');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var lazypipe = require('lazypipe');
var gulpIf = require('gulp-if');
var cssNano = require('gulp-cssnano');
var imageMin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var deploy = require('gulp-gh-pages');
var del = require('del');
var reload = browserSync.reload;
var port = 8080;

gulp.task('scripts', function () {
    return gulp.src('src/scripts/main.js')
        .pipe(requirejsOptimize({
          mainConfigFile: 'src/scripts/main.js'
        }))
        .pipe(gulp.dest('dist'));
});
/**
 * This task will Concat & Minify all CSS and JS references in your index.html
 * file into two files, one for CSS and one for JS. 
 * It will then copy your index.html file to the 'dist' directory, change the 
 * CSS and JS references to point to the newly created CSS and JS files.
 * 
 * In order for this to work, wrap your <link> tags for your CSS in your
 * index.html file like this:
 * 
 * <!-- build:css css/styles.min.css -->
 *      <your link tags go here>
 * <!-- endbuild -->
 * 
 * And wrap your <script> tags for your JS like this:
 * 
 * <!-- build:js js/main.min.js -->
 *      <your script tags go here> 
 * <!-- endbuild -->
 * 
 * Be sure only to wrap local files, not files coming in from a CDN.
 * 
 */
// Concat & Minify CSS into one file, save to dist and update index.html
// Concat & Minify JS into one file, save to dist and update index.html
gulp.task('js-css-min', function() {
  return gulp.src('src/index.html')
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    
    // Minifies only if it's a JavaScript file.
    .pipe(gulpIf('*.js', uglify()))
    
    // Minifies only if it's a CSS file.
    .pipe(gulpIf('*.css', cssNano()))
    
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('dist'));
});

// Minify index.html after it has been altered by useref and copied to dist.
gulp.task('index-min', function() {
  return gulp.src(['dist/index.html'])
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// Optimize images
gulp.task('images', function() {
  return gulp.src(['src/images/**/*.+(png|jpg|gif|svg|ico)'])
    .pipe(imageMin())
    .pipe(gulp.dest('dist'));
});

// Set files to watch for updates
gulp.task('watch', function() {
  gulp.watch(['src/**/*.js'], ['build', reload]);
  gulp.watch(['src/**/*.css'], ['build', reload]);
  gulp.watch(['src/**/*.html'], ['build', reload]); 
});

// Start the server with src files.
gulp.task('serve:src', ['watch'], function() {
  browserSync({
    port: port,
    server: {
      baseDir: 'src'
    }
  });
});

// Start the server with dist files.
gulp.task('serve:dist', ['build', 'watch'], function() {
  browserSync({
    port: port,
    server: {
      baseDir: 'dist'
    }
  });
});

// Build the dist file for deployment to production.
gulp.task('build', ['clean'], function() {
  runSequence('js-css-min', 'index-min');
});

// Clean the dist directory.
gulp.task('clean', function() {
  return del(['dist/*', '!dist/.git']);
});

// Push build to gh-pages
gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});