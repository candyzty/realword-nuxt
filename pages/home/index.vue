<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link" :class="{active: tab === 'your_feed'}" :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{active: tab==='global_feed'}" :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link class="nav-link" :class="{active: tag === 'tag'}" :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag'
                  }
                }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>

          <ArticleList :articles="articles"></ArticleList>

<!--          分页列表-->
          <ul class="pagination">
            <li class="page-item" :class="{action: item === page}" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link" :to="{
                name: 'home',
                query: {
                  page: item,
                  tag: $route.query.tag
                }
              }">{{ item }}</nuxt-link>
            </li>
          </ul>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link class="tag-pill tag-default" :key="item" v-for="item of tags" :to="{
                name: 'home',
                query: {
                  tab: tab,
                  tag: item,
                  page: $route.query.page
                }
              }">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '~/api/articles'
import { getTags } from "~/api/tag";
import { mapState } from 'vuex'
import ArticleList from '~/pages/common/article-list.vue'
export default {
  name: "HomeIndex",
  watchQuery: ['page', 'tag'],
  components: {ArticleList},
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 2
    const tab = query.tab
    const getArticlesFn = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    const [ articleRes, tagRes ] = await Promise.all([
        getArticlesFn({
          limit: limit,
          offset: (page - 1) * limit,
          tag: query.tag
        }),
        getTags()
    ])
    const { articles, articlesCount} = articleRes.data;
    const {  tags } = tagRes.data
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag: query.tag,
      tab: tab || 'global_feed'
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },

  methods: {
  }
}
</script>

<style scoped>

</style>