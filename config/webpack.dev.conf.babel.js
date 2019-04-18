import merge from 'webpack-merge';
import path from 'path';
import baseWebpackConf from './webpack.base.conf.babel';

const devWebpackConf = merge(baseWebpackConf, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
});

export default devWebpackConf;
