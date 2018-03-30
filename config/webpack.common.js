const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
// cssnano: to minify the css.
const cssnano = require('cssnano');
const { NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');
 
const helper = require('./helper');
 
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    return [
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        autoprefixer()
    ].concat(minimizeCss ? [cssnano()] : []);
};
 
const getCommonConfig = function(option) {
  return {
    devtool: 'cheap-module-source-map',
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helper.getRoot("src"), helper.getRoot("node_modules")]
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|ttf)$/,
          loader: 'file-loader'
        },
        {
          test: /\.css$/,
          use: [
            "exports-loader?module.exports.toString()",
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: postcssPlugins
              }
            }
          ]
        },
        {
          test: /\.scss$|\.sass$/,
          use: [
            "exports-loader?module.exports.toString()",
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": false,
                "precision": 8,
                "includePaths": []
              }
            }
          ]
        },
        {
          "include": [
            helper.getRoot("src/styles.css")
          ],
          "test": /\.css$/,
          "use": [
            "style-loader",
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ]
        },
        {
          "include": [
            helper.getRoot("src/styles.css")
          ],
          "test": /\.scss$|\.sass$/,
          "use": [
            "style-loader",
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": false,
                "precision": 8,
                "includePaths": []
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: ['raw-loader']
        }
      ]
    },
    plugins: [
      new AssetsPlugin(option),
      new NoEmitOnErrorsPlugin(),
      new CopyWebpackPlugin([
        {
          to: "assets",
          from: helper.getRoot("src/assets")
        },
        {
          to: "assets",
          from: helper.getRoot("src/favicon.ico")
        }
      ]),
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        title: 'angular demo',
        chunksSortMode: "dependency",
        inject: true
      }),
      new NamedModulesPlugin({})
    ],
    node: {
      global: true,
      crypto: "empty",
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
    devServer: {
      historyApiFallback: true
    }
  }
};
 
exports.getCommonConfig = getCommonConfig;