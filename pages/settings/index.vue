<template>
  <div class=
           "settings-page">
    <div class=
             "container page">
      <div class=
               "row">
        <div class=
                 "col-md-6 offset-md-3 col-xs-12">
          <h1 class=
                  "text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
              <fieldset class=
                            "form-group">
                <input v-model="user.image" class=
                           "form-control" type=
                           "text" placeholder=
                           "URL of
profile picture">
              </fieldset>
              <fieldset class=
                            "form-group">
                <input v-model="user.username" class=
                           "form-control form-control-lg" type=
                           "text"
                       placeholder=
                           "Your Name">
              </fieldset>
              <fieldset v-model="user.bio" class=
                            "form-group">
<textarea class=
              "form-control form-control-lg" rows=
              "8"
          placeholder=
              "Short bio about you"></textarea>
              </fieldset>
              <fieldset class=
                            "form-group">
                <input v-model="user.email" class=
                           "form-control form-control-lg" type=
                           "text"
                       placeholder=
                           "Email">
              </fieldset>
              <fieldset class=
                            "form-group">
                <input v-model="user.token" class=
                           "form-control form-control-lg" type=
                           "password"
                       placeholder=
                           "Password">
              </fieldset>
              <button @click="updateUser" class=
                          "btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '~/api/user'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: "UserSetting",
  data() {
    return {
      user: {
        email: '',
        token: '',
        username: '',
        bio: '',
        image: '',
      }
    }
  },
  async created() {
    await this.getUser()
  },
  methods: {
    // 获取用户信息
    async getUser() {
      let { user } = await getUser();
      this.user = user
    },
    // 更新用户信息
    async updateUser() {
      let { user } = await updateUser(this.user)
      this.$store.commit('setUser', user)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>