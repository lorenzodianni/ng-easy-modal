'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('default', ['clean'], function(){
  return gulp.src('module.js')
    .pipe(rename({basename: 'ngModal'}))
    .pipe(gulp.dest('dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean());
});
