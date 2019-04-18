import merge from 'webpack-merge';
import baseWebpackConf from './webpack.base.conf.babel';

const proWebpackConf = merge(baseWebpackConf, {
  mode: 'production',
});

export default proWebpackConf;
