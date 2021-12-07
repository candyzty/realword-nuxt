/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'

const request = axios.create({
    baseURL: 'https://api.realworld.io'
})

export default request

