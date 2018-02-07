const webpackMerge = require('webpack-merge');
 
const helper = require('./helper');
const getCommonConfig = require('./webpack.common').getCommonConfig;
 
const option = {
    path: helper.getRoot('build/debug'),
    filename: 'webpack-assets.json',
    prettyPrint: true
}
 
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
 
module.exports = webpackMerge(getCommonConfig(option), {
  entry: {
    "main": ["./src/main.ts"]
  },
  output: {
    path: helper.getRoot("build/debug"),
    filename: "[name].bundle.js?ver=" + new Date().getTime(),
    chunkFilename: "[id].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["awesome-typescript-loader", "angular2-template-loader"]
      }
    ]
  }
});