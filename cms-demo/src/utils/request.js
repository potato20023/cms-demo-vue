import axios from 'axios'
import service from './service'
import Cookies from 'js-cookie'

// 创建实例
const requestD = axios.create({
    baseURL: service.baseUrl,
    timeout: 5000
})

// 添加请求拦截器
requestD.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    if (Cookies.get('auth')) {
        config.headers = {
            'Authorization': Cookies.get('auth'),
            'Content-Type': 'application/json;chartset=UTF-8'
        }
    }
    return config;
}, err => {
    // 对请求错误做些什么
    return Promise.reject(err);
})


// 添加响应拦截器
requestD.interceptors.response.use(res => {
    // 对响应数据做些什么
    if (res.code == 99) {
        this.$router.path('/login')
        Cookies.set('auth', '')
        Cookies.set('userName', '')
    }
    return res.data;
}, err => {
    return Promise.reject(err)
})

export { requestD }