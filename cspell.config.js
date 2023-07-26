module.exports = {
	version: '0.2',
	language: 'en',
	ignorePaths: [
		'.git/',
		'.gitignore',
		'.vscode/**', // Otherwise VSCode package names will give errors.
		'dist/',
		'node_modules/**',
	],
	words: [
		'commitlint',
		'gulpfile',
		'huskyrc',
		'browserlist',
		'yepes',
		'elementor',
	],
};
