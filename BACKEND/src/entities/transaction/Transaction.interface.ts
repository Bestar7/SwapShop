interface TransactionInterface {
  id?: number;
  type: string;
  user: UserInterface;
  article?: ArticleInterface;
  pricePerUnit: number;
  quantity: number;
  total: number;
  discount: number;
  date: Date;
} // TODO add swapShop

interface TransactionsInterface {
  type: string;
  user: UserInterface;
  swapShop: SwapShopInterface;

  requestedArticles: {
    article: ArticleInterface;
    quantity: number; // TODO check quantity <= article.quantity
  }[];
}