let webpack = require('webpack');
let extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'login/': './build/bundles/login.bundle',
    'signup/': './build/bundles/signup.bundle',
    'dashboard/': './build/bundles/dashboard.bundle',
    'home/': './build/bundles/home.bundle',
  },
  output: {
    path: './public/',
    filename: '[name]app.js'
    // filename: '[name].js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_URL: (process.env.NODE_ENV === 'production') ? '\'AAAAAA\'' : `'//localhost:5000/'`
    }),
    new extractTextPlugin('[name]style.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      }
    ]
  }
};