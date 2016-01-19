'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var compass = require('gulp-compass');
var cssmin = require('gulp-cssmin');

gulp.task('scripts', function(){
  return gulp.src('./src/ng-easy-modal.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/ng-easy-modal.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './dist/css',
      sass: './src',
      comments: true,
      sourcemap: true
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssmin())
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./src/ng-easy-modal.js', ['scripts']);
  gulp.watch('./src/ng-easy-modal.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);
