// gulpfile.js
const { src, dest, watch } = require( 'gulp' );
const webpackStream = require( 'webpack-stream' );
const wpWebpackConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );

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
	watch( './scss/**/*.scss', scss );
	watch( './js/**/*.js', bundle );
};

exports.bundle = bundle;
exports.scss = scss;
exports.watch = look;
