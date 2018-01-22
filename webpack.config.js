const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');
const links = require('./app/content/links');

// ========== CONFIG ===========
const NODE_ENV = process.env.NODE_ENV;
const APP_TEMPLATE = process.env.APP_TEMPLATE;
const IS_PRODUCTION = NODE_ENV === 'production';
const _PROJECT_NAME = `'${pkg.name}'`;
const _PROJECT_VERSION = `'${pkg.version}'`;
const SUBFOLDER_LOCATION = process.env.SUBFOLDER_LOCATION || '';
const INPUTFOLDER = process.env.INPUTFOLDER || 'build';
const DEF_LANG = process.env.DEF_LANG || Object.keys(pkg.supportedLanguages)[0];

function withTemplate(name) {
  const newName = `${name}${APP_TEMPLATE ? `.${APP_TEMPLATE}` : ''}`;
  return newName;
}


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

// EJS templating support for files inside ./app
rules.push({
  test: /\/app\/.*\.ejs$/,
  // loader:
  // loader: 'ejs-loader?variable=data',
  loader: [
    // 'html-loader?interpolate',
    'ejs-loader?variable=data',
  ],
});
// HTML support
// rules.push({
//   test: /.*\.html/,
// });

// Sass + CSS-Modules support
rules.push({
  test: /^((?!\.global).)*\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use:
    [
      {
        loader: 'css-loader',
        options: {
          sourceMap: !IS_PRODUCTION,
          modules: true,
          localIdentName: '[name]_[local]',
          importLoaders: true,
        },
      },
      { loader: 'sass-loader' },
    ],
  }),
});

// Global stylesheets should keep their initial classname
rules.push({
  test: /(\.global\.scss|(.*)\.css)$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !IS_PRODUCTION,
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
      data: `@import "${path.resolve(__dirname, `./app/theme/${withTemplate('_config')}.scss`)}";`,
    },
    context: '/',
  },
}));

// Minify Javascript for production
if (IS_PRODUCTION) {
  if (IS_PRODUCTION) {
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }

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

const environmentOptions = {
  IS_PRODUCTION,
  _PROJECT_NAME,
  _PROJECT_VERSION,
  APP_TEMPLATE: JSON.stringify(APP_TEMPLATE),
  SUBFOLDER_LOCATION: JSON.stringify(SUBFOLDER_LOCATION),
  subfolder: SUBFOLDER_LOCATION || JSON.stringify(SUBFOLDER_LOCATION),
  AUTO_LOGIN: process.env.AUTO_LOGIN || 0,
  application: JSON.parse(JSON.stringify(pkg)),
  links,
  language: JSON.stringify(DEF_LANG),

};
plugins.push(new ExtractTextPlugin({ filename: `${pkg.name}_${pkg.version}-bundle.css?release=${new Date().getTime()}` }));


plugins.push(new webpack.DefinePlugin({ ENV: environmentOptions }));

plugins.push(new HtmlWebpackPlugin(Object.assign({
  template: IS_PRODUCTION ? 'index.template.ejs' : 'index.template.ejs',
  inject: 'body',
}, environmentOptions)));
plugins.push(new HtmlWebpackPlugin(Object.assign({
  template: IS_PRODUCTION ? 'index.template.ejs' : 'index.template.ejs',
  filename: '200.html',
  inject: 'body',
}, environmentOptions)));


const config = {
  entry: {
    app: [
      'babel-polyfill',
      './app/index.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, INPUTFOLDER),
    publicPath: SUBFOLDER_LOCATION || '/',
    filename: `${pkg.name}_${pkg.version}.js?release=${new Date().getTime()}`,
  },
  module: {
    rules,
  },
  plugins,
  devServer: {
    port: 3000,
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
