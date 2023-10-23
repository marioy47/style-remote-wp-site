# Preview style changes of local files on remote sites

This is a development tool that allow you to preview CSS and JS changes, done by local files, on remote sites.

It achieves this by creating a local proxy that retrieves the remote's site html/css/js, and then injects the contents of local CSS and JS files to the browser. This way you can preview how the directives of local files will look once they are applied to the remote site.

This tool will use WordPress linting and formatting tools so expect the code to follow WordPress standards.

## Usage

-   Create a git branch
-   Start the "injection" step by executing something like `REMOTE_HOST=https://google.com npm start`
    - The `REMOTE_HOST` environment variable is the URL where you want to inject styles
-   Modify either `scss/styles.scss` and/or `js/scripts.js` files
    -   You can use `@import` to work with multiple SCSS files
    -   You can use `import {} from ` in JavaScript since the project uses WebPack

```bash
git clone -b my-custom-branch
REMOTE_HOST=https://example.com npm start
# In another terminal:
nano scss/styles.scss js/scripts.js
```

## Using the results

If you like the scripts and styles. You can execute `npm run build` and copy the contents of the `dist/styles.css` and `js/scripts.js` to your website
