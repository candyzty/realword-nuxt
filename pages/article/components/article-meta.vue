<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image"/></nuxt-link>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <div v-if="isUserArticle">
      <button  class="btn btn-sm btn-outline-secondary" :class="{
      active: article.author.following
    }"><i class="ion-plus-round"></i>&nbsp;Follow Eric Simons <span class="counter">(10)</span></button>
      &nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{
      active: article.author.favorited
    }">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">(29)</span>
      </button>
    </div>
    <div v-else>
      <nuxt-link  class="btn btn-sm btn-outline-secondary" :to="{
        name: 'editor',
        query: {
          slug: article.slug
        }
      }"><i class="ion-plus-round"></i>&nbsp;Edit Article</nuxt-link>
      &nbsp;
      <button @click="deleteArticle" class="btn btn-outline-danger btn-sm" :class="{
      active: article.author.favorited
    }">
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article <span class="counter">(29)</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle } from '~/api/articles'
export default {
name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    isUserArticle() {
      console.log(this.user)
      return !(this.article.author.username === this.user.username)
    }
  },
  methods: {
    // 删除文章
    async deleteArticle() {
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>

</style>