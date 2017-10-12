const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

// ========== CONFIG ===========
const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === 'production';
const _PROJECT_NAME = `'${pkg.name}'`;
const _PROJECT_VERSION = `'${pkg.version}'`;

// =========== RULES ===========
const rules = [];

// Add image and font loader
rules.push({
  test: /\.(?:png|jpg|svg|otf|ttf)$/,
  use: [{ loader: 'url-loader' }],
});

// Transpile modern ES2017 / JSX with Babel - required for 'build'
rules.push({
  test: /\.jsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          ['env', {
            targets: {
              ie: 9,
            },
          }],
        ],
        plugins: [
          'transform-decorators-legacy',
          'transform-class-properties',
        ],
      },
    },
  ],
});

// Sass + CSS-Modules support
rules.push({
  test: /^((?!\.global).)*\.scss$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]_[local]',
        importLoaders: true,
      },
    },
    { loader: 'sass-loader' },
  ],
});

// Global stylesheets should keep their initial classname
rules.push({
  test: /(\.global\.scss|(.*)\.css)$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[local]',
        importLoaders: true,
      },
    },
    { loader: 'sass-loader' },
  ],
});

// Js linting with eslint
rules.push({
  enforce: 'pre',
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
});

// ========== PLUGINS ==========

const plugins = [];

// Support older plugins by passing options the pre webpack 2 way
plugins.push(new webpack.LoaderOptionsPlugin({
  minimize: IS_PRODUCTION,
  debug: !IS_PRODUCTION,
  options: {
    sassLoader: {
      data: `@import "${path.resolve(__dirname, './app/theme/_config.scss')}";`,
    },
    context: '/',
  },
}));

// Minify Javascript for production
if (IS_PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }));
}

plugins.push(new webpack.DefinePlugin({
  ENV: {
    IS_PRODUCTION,
    _PROJECT_NAME,
    _PROJECT_VERSION,
    AUTO_LOGIN: process.env.AUTO_LOGIN || 0,
  },
}));

plugins.push(new HtmlWebpackPlugin({
  template: IS_PRODUCTION ? 'index.template.ejs' : 'index.template.ejs',
  inject: 'body',
}));
plugins.push(new HtmlWebpackPlugin({
  template: IS_PRODUCTION ? 'index.template.ejs' : 'index.template.ejs',
  filename: '200.html',
  inject: 'body',
}));

const config = {
  entry: {
    app: [
      'babel-polyfill',
      './app/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: `${pkg.name}_${pkg.version}.js?release=${new Date().getTime()}`,
  },
  module: {
    rules,
  },
  plugins,
  devServer: {
    port: 3005,
    historyApiFallback: true,
    host: '0.0.0.0', // Make the dev server accessible for virtual machines
  },
};

if (!IS_PRODUCTION) {
  config.devtool = 'cheap-module-source-map';
  config.performance = {
    hints: IS_PRODUCTION,
  };
}

module.exports = config;
