import axios from "axios";

//创建axios对象
const service = axios.create();

//export default 是单一的，所以import 时不需要引入{} 
//export 可以声明对个，需要在{} 中声明对应的方法名
export default service;

//请求拦截器
service.interceptors.request.use(function (config){
  //发送请求之前
  return config;
},function (error){
    //请求错误
  return Promise.reject(error);
});
//响应拦截器
service.interceptors.response.use(function (response){
  //响应之后
  return response
},function (error){
  //响应错误
  return Promise.reject(error);
});


