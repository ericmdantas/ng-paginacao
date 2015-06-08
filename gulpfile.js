"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var rename = require('gulp-rename');
var karma = require('karma').server;

var COVERAGE = 'coverage/**/lcov.info';
var APP = 'src/ng-paginacao.js';
var APPMIN = 'ng-paginacao.min.js';
var DIST = 'dist';

gulp.task('build', ['test'], function()
{
    return gulp
			.src(APP)
			.pipe(uglify())
			.pipe(rename(APPMIN))
			.pipe(gulp.dest(DIST));
})

gulp.task('test', function(done)
{
    var _opts = {
                  configFile: __dirname + '/karma.conf.js',
                  singleRun: true,
                  browsers: ['Chrome']
               };

    return karma.start(_opts, done);
})

gulp.task('coverage', ['test'], function()
{
    return gulp
			.src(COVERAGE)
			.pipe(coveralls());
})