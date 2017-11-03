'use strict';

var gulp = require('gulp'),
 connect = require('gulp-connect'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
  srcmap = require('gulp-sourcemaps'),
  	 pug = require('gulp-pug'),
   clear = require('del'),
   watch = require('gulp-watch');

//concatenate JS files
gulp.task("concatScripts", function(){
	console.log("...concat complete");
	return gulp.src(['js/*.js'])
	.pipe(srcmap.init())
	.pipe(concat("app.js"))
	.pipe(srcmap.write('./'))
	.pipe(gulp.dest("js"));
});

//minify concatenated JS files
// gulp.task("minifyScripts", ['concatScripts'], function(){
// 	console.log("...minify scripts");
// 	return gulp.src("js/app.js")
// 	.pipe(uglify())
// 	.pipe(rename('app.min.js'))
// 	.pipe(gulp.dest('./'));
// });

//sass compile task
gulp.task("compileSass", function(){
	console.log("...Compiling Sass");
	return gulp.src('scss/index.scss')
	.pipe(srcmap.init())
	.pipe(sass())
	.pipe(srcmap.write('./'))
	.pipe(gulp.dest('css'));
});

//pug compile task
gulp.task("pug", function(){
	console.log("...compiling pug");
	gulp.src("pug/index.pug")
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest("./"));
});

//watch task
gulp.task("watch", function(){

	console.log("...watching sass");
	gulp.watch(['scss/*.scss'], ['compileSass']);

	console.log("...watching pug");
	gulp.watch(['pug/*.pug'], ['pug']);

});

//set up a gulp server
gulp.task("connect", function(){
	console.log("...connecting to server");
	connect.server({livereload: true});
	connect.server({port: 8000, livereload: true});
});

//live reload watches for css, js and pug changes
gulp.task("reload", function(){
	console.log('...reload in progress');
	watch(['css/*.css', 'js/*.js', 'index.html'])
	.pipe(connect.reload());
});

//clear dist contents
gulp.task("clear", function(){
	console.log("...clearing /dist")
	clear('dist');
});

//run default task
gulp.task("build", ['compileSass', 'pug', 'connect', 'watch', 'reload'], function(){
	console.log("...building distribution");
	return gulp.src(['css/*.css', 'app.min.js', 'index.html'], {base: './'})
	.pipe(gulp.dest("dist"));
});

gulp.task("default", ['clear'], function(){
	gulp.start('build');
});