let mix = require("laravel-mix");

mix.autoload({
  jquery: ["jQuery", "$"]
});

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: mix.config.babel()
          }
        ]
      }
    ]
  }
});

mix
  // .copy("src/_redirects", "dist/docs/_redirects")
  .js("src/js/app.js", "dist/docs/js")
  .sass("src/css/app.scss", "dist/docs/css")
  .options({
    processCssUrls: false
  })
  .browserSync({
    server: "dist",
    startPath: '/docs',
    proxy: false,
    files: ["dist/**/*.js", "dist/**/*.css", "dist/**/*.html"],
    reloadThrottle: 100
  });
