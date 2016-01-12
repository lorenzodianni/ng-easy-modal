'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');


gulp.task('default', function(){
  return gulp.src('ng-easy-modal.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
