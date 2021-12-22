/*
  Usage:
  1. npm install //To install all dev dependencies of package
  2. npm run dev //To start development and server for live preview
  3. npm run prod //To generate minifed files for live server
*/

const { src, dest, task, watch, series, parallel } = require('gulp');
const del = require('del'); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config
const babel = require('gulp-babel');
const concat = require('gulp-concat'); //For Concatinating js,css files
const uglify = require('gulp-terser');//To Minify JS files
const cleanCSS = require('gulp-clean-css');//To Minify CSS files
const purgecss = require('gulp-purgecss');// Remove Unused CSS from Styles

//Load Previews on Browser on dev
function livePreview(done){
	browserSync.init({
	  server: {
		baseDir: options.paths.dist.base
	  },
	  port: options.config.port || 5000
	});
	done();
}

// Triggers Browser reload
function previewReload(done){
	browserSync.reload();
	done();
}

//Development Tasks
function devClean(){
	return del([options.paths.dist.base]);
}

function devHTML(){
	return src(`${options.paths.src.base}/**/*.html`).pipe(dest(options.paths.dist.base));
}

function devManifest(){
	return src(`${options.paths.src.base}/**/*.webmanifest`).pipe(dest(options.paths.dist.base));
}

function devImages(){
	return src([`${options.paths.src.img}/**/*`]).pipe(dest(options.paths.dist.img));
}

function devJSON(){
	return src([`${options.paths.src.json}/**/*`]).pipe(dest(options.paths.dist.json));
}

function devSeparate(){
	return src([`${options.paths.src.separate}/**/*`]).pipe(dest(options.paths.dist.separate));
}

function devStyles(){
	const tailwindcss = require('tailwindcss'); 
	return src([`${options.paths.src.css}/**/*`])
		.pipe(postcss([
			tailwindcss(options.config.tailwindjs),
			require('autoprefixer'),
		]))
		.pipe(concat({ path: 'custom.min.css'}))
		.pipe(dest(options.paths.dist.css));
}

function devScripts(){
	return src([
		`${options.paths.src.js}/libs/**/*.js`,
		`${options.paths.src.js}/**/*.js`,
	]).pipe(concat({ path: 'custom.js'})).pipe(dest(options.paths.dist.js));
}

function watchFiles(){
	watch(`${options.paths.src.base}/**/*.html`,series(devHTML, devStyles, previewReload));
	watch(`${options.paths.src.base}/**/*.webmanifest`,series(devManifest, previewReload));
	watch([options.config.tailwindjs, `${options.paths.src.css}/**/*`],series(devStyles, previewReload));
	watch(`${options.paths.src.js}/**/*.js`,series(devScripts, previewReload));
	watch(`${options.paths.src.img}/**/*`,series(devImages, previewReload));
	watch(`${options.paths.src.separate}/**/*`,series(devSeparate, previewReload));
  }

exports.default = series( // npm run dev
	devClean, // Clean Dist Folder
	parallel(devStyles, devScripts, devHTML, devManifest, devImages, devJSON, devSeparate), //Run All tasks in parallel
	livePreview, // Live Preview Build
	watchFiles // Watch for Live Changes
);

/**
 * 
 * PRODUCTION
 * 
 */
function prodHTML(){
	return src(`${options.paths.dist.base}/**/*.html`).pipe(dest(options.paths.build.base));
}

function prodManifest(){
	return src(`${options.paths.dist.base}/**/*.webmanifest`).pipe(dest(options.paths.build.base));
}

function prodImages(){
	return src([`${options.paths.dist.img}/**/*`]).pipe(dest(options.paths.build.img));
}

function prodJSON(){
	return src([`${options.paths.dist.json}/**/*`]).pipe(dest(options.paths.build.json));
}

function prodSeparate(){
	return src([`${options.paths.dist.separate}/**/*`]).pipe(dest(options.paths.build.separate));
}

function prodClean(){
	return del([options.paths.build.base]);
}

function prodStyles(){
	return src(`${options.paths.dist.css}/**/*`).pipe(purgecss({
	  content: ['src/**/*.{html,js}'],
	  defaultExtractor: content => {
		const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
		const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
		return broadMatches.concat(innerMatches)
	  }
	}))
	.pipe(cleanCSS({compatibility: '*'}))
	.pipe(dest(options.paths.build.css));
}
  
function prodScripts(){
	return src([
	  `${options.paths.src.js}/libs/**/*.js`,
	  `${options.paths.src.js}/**/*.js`
	])
	.pipe(concat({ path: 'custom.min.js'}))
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(dest(options.paths.build.js));
}

exports.prod = series(
	prodClean, // Clean Build Folder
	parallel(prodStyles, prodScripts, prodHTML, prodManifest, prodImages, prodJSON, prodSeparate), //Run All tasks in parallel
);