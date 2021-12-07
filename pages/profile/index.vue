<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{
                  name: 'profile',
                  params: {
                    username: 'Gerome',
                  },
                  query: {
                    tag: 'user'
                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{
                  name: 'profile',
                  params: {
                    username: 'Gerome',
                  },
                  query: {
                    tag: 'favorited'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>
          <ArticleList v-if="articles.length > 0" :articles="articles"></ArticleList>
          <div v-else class="article-preview">No articles are here... yet.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from '~/pages/common/article-list.vue'
import { getProfile } from '~/api/profile'
import { getArticles, getFeedArticles } from '~/api/articles'
export default {
  name: "UserProfile",
  data() {
    return {
      profile: {},
      articles: [],
      username: this.$route.params.username
    }
  },
  components: {
    ArticleList
  },
  async created() {
    await this.getProfile()
    if (this.$route.query.tag && this.$route.query.tag === "favorited") {
      await this.getFavoritesArticles()
    } else {
      await this.getUserArticles()
    }
    console.log(this.articles)
  },
  methods: {
    async getProfile() {
      console.log(this.$route.params)
      const {data} = await getProfile(this.username);
      console.log(data)
      this.profile = data.profile;
    },

    // 获取自己的文章列表
    async getUserArticles() {
      const { data } = await getArticles({
        author: this.username
      })
      this.articles = data.articles
    },

    // 获取自己关注的文章列表
    async getFavoritesArticles() {
      const { data } = await getArticles({
        favorited: this.username
      })
      this.articles = data.articles
    }
  },
}
</script>

<style scoped>

</style>