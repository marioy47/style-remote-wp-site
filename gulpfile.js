// gulpfile.js
const { src, dest, watch, series } = require( 'gulp' );
const path = require( 'path' );
const webpackStream = require( 'webpack-stream' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const bs = require( 'browser-sync' );
const autoprefixer = require( 'autoprefixer' );
const postcss = require( 'gulp-postcss' );
const prettier = require( 'gulp-prettier' );

// Modify WordPress webpack. Change the output dir to dist/ and the name of the start file
const wpWebpackConfig = require( '@wordpress/scripts/config/webpack.config' );
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

// Export function so gulp can execute them.
exports.bundle = jsBundle;
exports.scss = scss;
exports.watch = look;
exports.build = series( jsBundle, scss );
