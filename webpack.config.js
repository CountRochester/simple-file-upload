const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV.trim() !== 'production'

const filename = ext => isDev
  ? `[name].bundle.${ext}`
  : `[contenthash].[name].bundle.${ext}`

const webpackModules = {
  rules: [
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
  ]
}

const plugins = [
  new HTMLWebpackPlugin({
    template: './src/index.html'
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin()
]

if (!isDev) {
  plugins.push(new CssMinimizerPlugin())
}

const webpackConfig = {
  entry: './src/index.js',
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: filename('js')
  },
  module: webpackModules,
  plugins
}

module.exports = webpackConfig
