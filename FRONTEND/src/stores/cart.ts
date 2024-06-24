import { defineStore } from 'pinia'

interface State {
  articles: Map<number, Article>;
}

const useCartStore = defineStore('cart', {
  state: (): State => ({
    articles: new Map(),
  }),
  actions: {
    addArticle(article: Article): void {
      this.articles.set(article.id!, article);
    },
    removeArticle(article: Article): void {
      this.articles.delete(article.id!);
    },
    hasArticle(article: Article): boolean {
      return this.articles.has(article.id!);
    },
    clearCart(): void {
      this.articles.clear();
    }
  },
  getters: {
    getById: (state:State): (id: number) => Article | undefined => {
      return (id:number) => state.articles.get(id);
    },
    getArticles: (state:State): Article[] => {
      return Array.from(state.articles.values());
    }
  }
})

export { useCartStore }