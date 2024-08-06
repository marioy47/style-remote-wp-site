export default {
	version: '0.2',
	language: 'en',
	ignorePaths: [
		'.git/',
		'.gitignore',
		'.vscode/**', // Otherwise VSCode package names will give errors.
		'cspell.config.js',
		'dist/**',
		'node_modules/**',
		'src/scss/*', // Most CSS source code ignores any kind of spelling
	],
	words: [
		'browserlist',
		'commitlint',
		'elementor',
		'gulpfile',
		'huskyrc',
		'nvim',
		'stylelint',
		'yepes',
	],
};
