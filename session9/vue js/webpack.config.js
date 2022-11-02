const { VueLoaderPlugin } = require("vue-loader");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.ts',
    reverse: './src/reverseindex.ts'
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
        vue: 'vue/dist/vue.js'
    }
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      filename: 'reverse.html',
      template: './src/reverse.html',
      chunks: ['reverse']
    })
  ]
}
