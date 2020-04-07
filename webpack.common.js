const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/app',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['lodash', 'syntax-function-bind'],
              presets: ['env', 'react', 'stage-1'],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|swf|ogg)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ReduxActions: `${__dirname}/src/actions`,
      ReduxReducers: `${__dirname}/src/reducers`,
      SharedComponents: `${__dirname}/src/components/shared`,
      Assets: `${__dirname}/src/assets`,
      Utils: `${__dirname}/src/utils`,
    },
  },
  plugins: [
    // new CleanWebpgitackPlugin(),
    new HtmlWebpackPlugin({
      title: "Corina",
      template: `${__dirname}/dist/index.html`,
    }),
  ],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    publicPath: '/',
  },
};
