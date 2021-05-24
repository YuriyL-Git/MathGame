const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMimimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const esLintPlugin = isDevevelopment =>
    isDevevelopment ? [new ESLintPlugin({extensions: ['ts', 'js']})] : [];

const optimization = () => {
  const config = {
    splitChunks: {chunks: 'all'},
  };
  if (isProd) {
    config.minimize = true;
    config.minimizer = [
      new CssMimimizerWebpackPlugin(),
    ];
  }
  return config;
};

const jsLoaders = preset => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      },
    },
  ];

  if (preset) loaders[0].options.presets.push(preset);
  return loaders;
};

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './main.ts'],
  },
  resolve: {
    extensions: ['.ts', '.js', '.png'],
    alias: {
      '@Scripts': path.resolve(__dirname, 'src/assets/app'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : false,
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true,
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    ...esLintPlugin(isDev),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: isProd,
      favicon: "./assets/img/favicon.ico"
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript'),
      }
    ],
  },
};
