import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const baseWebpackConf = {
  entry: './src/main.js',
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@': path.join(__dirname, '..', 'src'),
    },
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
  ],
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      }, {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          }, {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      }, {
        test: /\.html?$/,
        use: 'html-loader',
      }, {
        test: /\.vue$/,
        use: 'vue-loader',
      }, {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['/src'],
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader',
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: 'url-loader',
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader',
      }, {
        test: /favicon\.ico(\?.*)?$/,
        use: 'file-loader',
      },
    ],
  },
};

export default baseWebpackConf;
