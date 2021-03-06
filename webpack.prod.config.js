const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// process.env.NODE_ENV = 'production';

module.exports = require('./webpack.config')({
  mode: 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // favicon: 'public/favicon.ico',
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
    }),
    new UnusedFilesWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ],
});
