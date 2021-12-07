<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input v-model="articles.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="articles.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="articles.body" class="form-control" rows="8" placeholder="Write yourarticle (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="articles.tagStr" type="text" class="form-control" placeholder="Entertags"><div class="tag-list"></div>
              </fieldset>
              <button @click="postArticles" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postArticles, putArticles, getArticle } from '~/api/articles'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: "index",
  data() {
    return {
      slug: '',
      articles: {
        title: '',
        description: '',
        body: '',
        tagStr: '',
        tagList: []
      }
    }
  },
  async created() {
    // 判断路由参数里面是否有slug
    if (this.$route.query.slug) {
      // 查询文章详情，是编辑文章
      await this.getArticle(this.$route.query.slug)
    }
  },

  methods: {
    async getArticle(slug) {
      let { article } = await getArticle(slug)
      this.slug = slug;
      this.articles.title = article.title
      this.articles.description = article.description
      this.articles.body = article.body
      this.articles.tagStr = article.tagList.join(',')
    },
    async postArticles() {
      let res
      this.articles.tagList = this.articles.tagStr.split(',')
      if (this.slug === '') {
        res = await postArticles(this.articles);
      } else {
        res = await putArticles({ slug: this.slug, articles: this.articles} );
      }

      await this.$router.push(`/article/${res.article.slug}`)
    }
  }
}
</script>

<style scoped>

</style>