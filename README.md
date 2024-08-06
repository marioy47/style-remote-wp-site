# Preview style changes of local files on remote sites

This is a development tool that allow you to preview CSS and JS changes, done by local files, on remote sites.

It achieves this by creating a local proxy (using browserSync) that retrieves the remote's site `html/css/js`, and then injects the contents of local CSS and JS files to the browser. This way you can preview how the directives of local files will look once they are applied to the remote site.

This tool will use WordPress linting and formatting tools so expect the code to follow WordPress standards.

## Usage

-   Create a git branch
-   Start the "injection" step by executing something like `REMOTE_HOST=https://my-remote-site.com npm start`
    -   The `REMOTE_HOST` environment variable is the URL where you want to inject styles
-   Modify either `src/scss/styles.scss` and/or `src/js/scripts.js` files
    -   You can use `@import` to work with multiple SCSS files
    -   You can use `import {} from ` in JavaScript since the project uses WebPack

```bash
git clone -b my-custom-branch
REMOTE_HOST=https://example.com npm start
# In another terminal:
nvim src/scss/styles.scss src/js/scripts.js
```

## Using the results

If you like the scripts and styles. You can execute `npm run build` and copy the contents of the `dist/css/styles.css` and `dist/js/scripts.js` to your website

## Linting and formatting

Since the project uses `lint-staged`, you don't have to format before submitting code to your repo. But, in the case you are not submitting code, you have the following commands:

| Command                            | Description                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `npm run lint`                     | It will run ALL the linters (scss, js, markdown and spelling) to detect errors |
| `npm run format`                   | It will lint AND format all the files                                          |
| `npm run lint:<css,js,md,spell>`   | Will run only one linter                                                       |
| `npm run format:<css,js,md,spell>` | Will run only one formatter                                                    |
