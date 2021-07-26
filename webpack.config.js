const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const src = path.join(__dirname, 'client', 'src')
const dist = path.join(__dirname, 'client', 'dist')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(src, 'index.js')],
  output: {
    filename: '[name].bundle.js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(src, 'assets'), to: dist }
      ]
    })
  ]
}