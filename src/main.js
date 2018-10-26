// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import $ from 'jquery';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import moment from 'moment';
// import axios from 'axios';
import myaxios from '@/plugins/MyAxios';
import MyBreadcrumb from '@/components/MyBreadcrumb';

Vue.use(ElementUI);
Vue.use(myaxios);
Vue.component(MyBreadcrumb.name, MyBreadcrumb);

Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString);
});
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
// Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

