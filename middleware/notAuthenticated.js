
/**
 * 验证是否登录的中间件
 */
export default function ({ store, redirect }) {
    console.log(1111111111)
    if (store.state.user) {
        return redirect('/')
    }
}