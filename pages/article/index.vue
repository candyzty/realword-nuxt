<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article"></ArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>
      <hr/>
      <div class="article-actions">
        <ArticleMeta :article="article"></ArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
                <textarea v-model="currComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="article-meta">
              <img :src="article.author.image"/>
              <button @click="addComment"  class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div v-for="comment of comments" class="card">
            <div class="card-block">
              <p class="card-text">{{ comment.body }}</p>
            </div>
<!--            <div class="card-footer">-->
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: '12'
                }
              }" class="comment-author"><img :src="comment.author.image" class="comment-authorimg"/></nuxt-link>
              &nbsp;
              <a href="" class="comment-author">{{ comment.author.username }}</a>
              <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, getArticleComments, addArticleComments } from '~/api/articles'
import MarkdownIt from 'markdown-it'
import ArticleMeta from '~/pages/article/components/article-meta.vue'
export default {
  name: "article",
  components: {
    ArticleMeta
  },
  async asyncData ({ route }) {
    let slug = route.params.articleName
    console.log(route)
    const { data: articleRes } = await getArticle(slug);
    console.log(articleRes)
    console.log(121)
    // const resArr = await Promise.all([getArticle('Explore-implementations-1'), getArticleComments('Explore-implementations-1')])
    // console.log(resArr)
    const { article } = articleRes
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article,
      slug

    }
  },
  head () {
    return {
      title: `${this.article.title} - RealWord`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  },
  async mounted() {
    await this.getComments()
  },
  data() {
    return {
      currComment: '',
      comments: [],
      // 是否是自己的文章
      isUserArticle: false
    }
  },
  methods: {
    // 新增一条评论
    async addComment() {
      // 校验currComment评论是否为空
      if (this.currComment !== '') {
        await addArticleComments({comment: {body: this.currComment}, slug: this.slug})
        this.currComment = '';
        await this.getComments()
      }
    },

    // 获取评论
    async getComments() {
      const { data: articleCommentsRes} = await getArticleComments(this.slug);
      this.comments = articleCommentsRes['comments']
    },

    // 删除评论
    deleteComment(comment) {

    }
  }
}
</script>

<style scoped>

</style>