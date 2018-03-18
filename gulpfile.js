var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var zip = require('gulp-zip');
var mergeStream = require('merge-stream');
var clean = require('gulp-clean');
 
gulp.task('package', function() {
  return mergeStream(
    gulp.src('build/debug/**')
      .pipe(zip('debug.zip'), {
        compress: true
      })
      .pipe(gulp.dest('build')),
    gulp.src('build/release/**')
      .pipe(zip('release.zip'), {
        compress: true
      })
      .pipe(gulp.dest('build'))
  );
});