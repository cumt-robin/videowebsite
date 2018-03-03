const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const webpackMerge = require('webpack-merge');
 
const helper = require('./helper');
const getCommonConfig = require('./webpack.common').getCommonConfig;
 
const option = {
    path: helper.getRoot('build/release'),
    filename: 'webpack-assets.json',
    prettyPrint: true
}
 
const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
 
module.exports = webpackMerge(getCommonConfig(option), {
  entry: {
    main: ["./src/main.aot.ts"]
  },
  output: {
    path: helper.getRoot("build/release"),
    filename: "[name].bundle.js?ver=" + new Date().getTime(),
    chunkFilename: "[id].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: helper.getRoot("tsconfig-aot.json"),
      entryModule: helper.getRoot('src/app') + '/app.module#AppModule'
    }),
    new UglifyJsPlugin({
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: false, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      },
      sourceMap: true
    })
  ]
});