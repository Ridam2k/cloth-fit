const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/(node_modules)/, /\.spec\.js$/],
        include: [
          path.resolve(__dirname, '../js')
        ],
        use: []
      },
      {
        test: /\.css$/,
        use: [ 
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'     
          } 
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            query: {
              modules: false,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true,
    historyApiFallback: true
  }
};
