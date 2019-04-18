import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import format from 'string-format';
import arrurl from '../map/array_format_url';
import objurl from '../map/obj_format_url';

Axios.defaults.baseURL = 'http://acm.nankai.edu.cn/api';

Vue.use(VueAxios, Axios);

const aget = function AwaitHttpGet(api) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(api).then((res) => {
      if (res.data.code === 0) resolve(res.data.data);
      else reject(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const arrapi = function ApiParamsArray(api, arr) {
  return aget(format(arrurl[api], ...arr));
};

const objapi = function ApiParamsObject(api, obj) {
  return aget(format(objurl[api], obj));
};

const url = function GetApiUrlFromObjFormat(api) {
  return objurl[api];
};

Vue.prototype.$http.aget = aget;
Vue.prototype.$http.api = objapi;
Vue.prototype.$http.arrapi = arrapi;

export {
  aget,
  objapi,
  url,
};
