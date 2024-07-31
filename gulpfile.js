// gulpfile.js
import { src, dest, watch, series } from 'gulp';
import path from 'path';
import webpackStream from 'webpack-stream';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );
import bs from 'browser-sync';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import prettier from 'gulp-prettier';

// Modify WordPress webpack. Change the output dir to dist/ and the name of the start file
import wpWebpackConfig from '@wordpress/scripts/config/webpack.config.js';
const localWebpackConfig = {
	...wpWebpackConfig,
	entry: {
		'js/scripts': './js/scripts.js',
	},
	output: {
		path: path.resolve( import.meta.dirname, 'dist' ),
		filename: '[name].js',
	},
};

/**
 * Bundle JavaScript files into a single scripts.js file
 */
const jsBundle = () => {
	return src( './js/scripts.js' )
		.pipe( webpackStream( localWebpackConfig ) ) // Use WordPress webpack
		.pipe( dest( './dist/' ) );
};

/**
 * Compile SCSS into a single styles.css file
 */
const scss = () => {
	return src( './scss/**/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( postcss( [ autoprefixer( { browserlist: [ '> 1%' ] } ) ] ) )
		.pipe( prettier() )
		.pipe( dest( './dist/css' ) );
};

/**
 * Apply bundle() or scss() when a file changes.
 */
const look = () => {
	bs.init( {
		proxy: process.env.REMOTE_HOST || 'https://archive.org',
		serveStatic: [ './' ],
		files: [ 'dist/css/*.css', 'dist/js/*.js' ],
		rewriteRules: [
			{
				match: /<\/head>/i,
				fn: () =>
					'<link rel="stylesheet" type="text/css" href="/dist/css/styles.css"></head>',
			},
			{
				match: /<\/body>/i,
				fn: () =>
					'<script type="text/javascript" src="/dist/js/scripts.js"></script>',
			},
		],
	} );

	watch( './scss/**/*.scss', scss );
	watch( './js/**/*.js', jsBundle );
};

const build = series( jsBundle, scss );

export { jsBundle as bundle };
export { scss as scss };
export { look as watch };
export { build as build };
