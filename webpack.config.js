var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: ['./app/main.js', './sass/main.sass'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader?url=false', 'sass-loader?outputStyle=compressed'])
      }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        babel: {
          "presets": ["es2015"],
          "plugins": ["transform-runtime"]
        }
      }
    }),

    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ]),

    new ExtractTextPlugin({
      filename: './build.css',
      allChunks:  true
    }),

    // new MinifyPlugin({},{
    //   test: /\.js$/
    // })
  ]
}
