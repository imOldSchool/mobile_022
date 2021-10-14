import axios from 'axios'
//引入vuex模块
import store from '@/store'
import jsonBig from 'json-bigint'

// axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
axios.defaults.baseURL = 'http://toutiao-app.itheima.net'

//  // transformResponse 允许自定义原始的响应数据（字符串）
//  axios.create({

//   // transformResponse 允许自定义原始的响应数据（字符串）
//   transformResponse: [function (data) {
//     try {
//       // 如果转换成功则返回转换的数据结果
//       return jsonBig.parse(data)
//     } catch (err) {
//       // 如果转换失败，则包装为统一数据格式并返回
//       return data
//     }
//   }]
// })
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',  // 接口基础路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

//设置axios拦截器 如果已登陆状态  就往请求里添加tonken
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    
    console.log('经过拦截器，下一步拦截')
    console.log(config)
    const { user } = store.state.usertoken
    // console.log( 'vuex:'+ user.token)
    // //如果vuex里面有token就 吧tonken添加进请求头

    if(user || user.token){
        console.log('拦截器运行')
        config.headers.Authorization = `Bearer ${user.token}`
    }
    console.log(user)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



export default request