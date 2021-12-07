import axios from "axios";


export const request = axios.create({
    baseURL: 'https://api.realworld.io'
})


// 通过nuxt插件机制获取到上下文对象(query, params, req, res,app,store), 插件导出函数必须是default
export default (context) => {
    // 请求拦截器 Authorization `Token
    request.interceptors.request.use(config => {
        const { user } = context.store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${context.store.state.user.token}`
        }
        return config
    }, error => {
        return Promise.reject(error)
    })
// 响应拦截器
}