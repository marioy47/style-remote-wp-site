module.exports = {
	'*.scss': 'npm run format:css',
	'*.js': 'npm run format:js',
	'*.md': 'npm run format:md',
	'*': "npx cspell" // Only cspell on changed files.
};
