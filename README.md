# LiveChat Docs
Hello 👋!

The source (markdown & assets) for all of the APIs documentations. Rendered here: https://docs.livechatinc.com/

## If you're new to LiveChat
[LiveChat](https://www.livechatinc.com/) is an online customer service software with live support, help desk software and web analytics capabilities. It's used by more than 20,000 companies all over the world. You can find more information here: [LiveChat for Developers](https://developers.livechatinc.com/).

## Support & Feedback
Please let us know if you have any thoughts on making this collection complete. We are eager to make the documentations better and better! Drop us a line at developers@livechatinc.com or submit a pull request.

:rocket:

## Development

Be sure that you have the node >= 6.0.0 and npm installed. Next, clone this repository and run:

```bash
npm install
npm run start@2.0
```

To build your static output to the `/dist` folder, use:

```bash
rm -rf ./dist
npm run build
```

## Structure

```
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up unprocessed in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--css              // CSS files in the root of this folder will end up in /css/...
|  |--js               // app.js will be compiled to /app.js with babel
|  |--images           // images will be optimized
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page is the one about the available functions:

https://gohugo.io/templates/functions/

1. For assets that are completely static and don't need to go through the asset pipeline,
use the `site/static` folder. Font-files, PDFs, etc, all go there.

2. Files in the static folder end up in the web root. So a file called `site/static/favicon.ico`
will end up being available as `/favicon.ico` and so on...

3. The `src/js/app.js` file is the entrypoint for webpack and will be built to `/dist/app.js`.

4. You can use ES6 and use both relative imports, or import libraries from npm.

5. Any CSS file directly under the `src/css/` folder will get compiled with Sass
to `/dist/css/{filename}.css`. Import statements will be resolved as a part of the build.
