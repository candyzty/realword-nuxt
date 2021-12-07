<template>
  <div>
  <div class="article-preview"
       v-for="article of articles"
       :key="article.slug"
  >
    <div class="article-meta">
      <nuxt-link to="/profile">
        <img :src="article.author.image"/>
      </nuxt-link>
      <div class="info">
        <nuxt-link to="">{{ article.author.username }}</nuxt-link>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
      <button :disabled="article.favoriteDisabled" @click="onFavorite(article)" :class="{ active: article.favorited }" class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="{ name: 'article', params: {
        articleName: article.slug
      }}" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>

  </div>
</template>

<script>
import {addFavorite, deleteFavorite} from "~/api/articles";

export default {
name: "article-list",
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style scoped>

</style>