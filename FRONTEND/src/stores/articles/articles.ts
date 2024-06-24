import { defineStore } from 'pinia'

interface State {
  oneArticle: Article | null,
  articles: Article[] | [],
}

const useArticlesStore = defineStore('articles', {
  state: (): State => ({
    oneArticle: null,
    articles: [],
  }),
  getters: {
    getArticles: (state) => state.articles,
    getOneArticle: (state) => state.oneArticle,
  },
  actions: {
    setOneArticle(article: Article | null) {
      this.oneArticle = article;
    },
    setArticles(articles: Article[]) {
      this.articles = articles;
    }
  }
})

export { useArticlesStore }