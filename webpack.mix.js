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
  .copy("src/_redirects", "dist/_redirects")
  .js("src/js/app.js", "dist/js")
  .sass("src/css/app.scss", "dist/css")
  .options({
    processCssUrls: false
  })
  .browserSync({
    server: "dist",
    startPath: '/',
    proxy: false,
    files: ["dist/**/*.js", "dist/**/*.css", "dist/**/*.html"],
    reloadThrottle: 100
  });
