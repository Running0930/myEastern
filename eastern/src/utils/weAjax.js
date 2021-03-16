//引入axios
import axios from 'axios'

const ajax=axios.create({
    baseURL:'/weapi',//设置请求根路径
    timeout:20000 //设置请求超时时间
})

// 请求拦截器
ajax.interceptors.request.use(config=>{
    return config
})

// 响应拦截器
ajax.interceptors.response.use(response=>{
    // console.log(response);
    return response
},error=>{
    console.log('响应失败:',error.message);
    return Promise.reject(error)
})
export default ajax;
