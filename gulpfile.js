// gulpfile.js
const { src, dest } = require( 'gulp' );
const webpackStream = require( 'webpack-stream' );
const wpWebpackConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

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

exports.bundle = bundle;
