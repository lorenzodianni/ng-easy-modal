'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var babel = require('gulp-babel');


gulp.task('default', ['clean'], function(){
  return gulp.src('ngModal.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean());
});
