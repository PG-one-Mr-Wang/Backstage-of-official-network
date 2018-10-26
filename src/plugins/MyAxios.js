import axios from 'axios';
const MyAxios = {};
MyAxios.install = function(Vue) {
  axios.defaults.baseURL = '/api';
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.url.toLocaleLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  Vue.prototype.$http = axios;
}

export default MyAxios;


// import axios from 'axios';
// const MyAxios = {};
// MyAxios.install = function(Vue) {
//   // axios.defaults.baseURL = 'http://172.31.1.10:8080/';
//   // const baseURL = 'http://172.31.1.10:8080/';
//   axios.defaults.baseURL = '/api';
//   axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     if(config.url.toLocaleLowerCase() !== 'login') {
//       const token = sessionStorage.getItem('token');
//       config.headers.Authorization= token;
//     }
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

//   // Add a response interceptor
//   axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });

//   Vue.prototype.$http = axios;
// }

// export default MyAxios;
