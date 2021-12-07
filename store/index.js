
const cookieparser = process.server ? require('cookieparser') : null

export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null,
        auth: null
    }
}

export const mutations = {
    setUser (state, data) {
      state.user = data
    },
    setAuth (state, auth) {
        state.auth = auth
    }
}

export const actions = {
    // 初始化容器以及需要传递给客户端的数据
    // 这个特殊的action 只会在服务端渲染期间运行，必须是这个名字
    nuxtServerInit ({ commit }, { req }) {
        let auth = null
        // 如果请求头中有 cookie
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth)
            } catch (e) {
                // No Valid cookie found
            }
        }

        commit('setAuth', auth)
    }
}