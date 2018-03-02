//global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
//var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = 'http://localhost:1637/public/assets';
var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  //new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
} else {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
  );
}

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  mode: 'production',
//  debug: process.env.NODE_ENV !== 'production',
  resolve: {
//    root: path.join(__dirname, 'src'),
//    modulesDirectories: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  module: {
      rules: [
          {
              test: /(\.css)$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }]
          },
          {
              test: /\.(jsx|js)?$/,
              use: [{
                  loader: "babel-loader",
                  options: {
                      cacheDirectory: true,
                      presets: ['react', 'es2015', 'stage-0'] // Transpiles JSX and ES6
                  }
              }]
          }
      ],
  }
};
