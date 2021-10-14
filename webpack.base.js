const PATH = require('path'); // путь до корня

const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: []
          }
        }
      },
      {
        //test: /\.js$/,
        test: /\.m?js$/,
        loader: 'babel-loader',
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.styl(us)?$/,
        //loader: "stylus-loader",
        use: [
          'vue-style-loader',
          'css-loader',
          //'stylus-loader',
          //'stylus-loader',
          //{loader: 'postcss-loader', options: {sourceMap: true}},
          {
            loader: 'stylus-loader',
            options: {
              //webpackImporter: false,
              sourceMap: 'development',
              //use: [require('nib')(), require('rupture')()],
              use: [require('nib')(), require('rupture')()],
              import: [
                '~rupture/rupture/index.styl',
                '~nib/lib/nib/index.styl',
                //PATH.join(__dirname, 'client/style/mixins.styl')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (isProduction) {
  config = merge(config, {
    optimization: {
      minimize: true,
      minimizer: [new OptimizeCSSAssetsPlugin(), new TerserPlugin()],
    },
  });
}

module.exports = config;
