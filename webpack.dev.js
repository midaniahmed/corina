const webpack = require("webpack");
const PluginProgressBar = require("progress-bar-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const chalk = require("chalk");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: "./.env",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new PluginProgressBar({
      clear: false,
      complete: chalk.green.bold('#'),
      format: 'Building... [:bar] :current/:total',
      incomplete: ' ',
      renderThrottle: 500,
      summary: false,
      width: 20,
    }),
  ],
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 9000,
    watchContentBase: true,
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'info',
    filename: 'bundle.js',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    publicPath: '/',
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      depth: false,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      hash: false,
      maxModules: 0,
      modules: false,
      performance: false,
      providedExports: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: true,
      usedExports: false,
      version: false,
      warnings: false,
    },
  },
};
