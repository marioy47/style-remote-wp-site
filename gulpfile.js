// gulpfile.js
const { src, dest, watch } = require( 'gulp' );
const webpackStream = require( 'webpack-stream' );
const wpWebpackConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const fs = require( 'fs' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const bs = require( 'browser-sync' );

// Modify WordPress webpack. Change the output dir to dist/ and the name of the start file
const localWebpackConfig = {
	...wpWebpackConfig,
	entry: {
		'js/scripts': './js/scripts.js',
	},
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: '[name].js',
	},
};

const bundle = () => {
	return src( './js/scripts.js' )
		.pipe( webpackStream( localWebpackConfig ) ) // Use WordPress webpack
		.pipe( dest( './dist/' ) );
};

const scss = () => {
	return src( './scss/**/*.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( dest( './dist/css' ) );
};

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
	watch( './js/**/*.js', bundle );
};

exports.bundle = bundle;
exports.scss = scss;
exports.watch = look;
