/**
 * Defines a transaction for an Article (either giving or receiving).
 * 
 * @interface
 * 
 * @property {number} [id] - The unique identifier of the transaction.
 * @property {string} type - The type of the transaction.
 * @property {User} user - The user involved in the transaction.
 * @property {Article} article - The article involved in the transaction.
 * @property {number} quantity - The quantity of the article involved in the transaction.
 * @property {number} pricePerUnit - The price per unit of the article involved in the transaction.
 * @property {number} total - The total price of the transaction.
 * @property {number} discount - The discount applied to the transaction.
 * @property {Date} date - The date of the transaction.
 */
interface Transaction {
  id?: number;
  type: string;
  user: User;
  article: Article;
  quantity: number;
  pricePerUnit: number;
  total: number;
  discount: number;
  date: Date;
}

/**
 * Defines a set of transactions.
 * 
 * @interface
 * 
 * @property {string} type - The type of the transactions.
 * @property {User | null} user - The user involved in the transactions, or null if no user is involved.
 * @property {SwapShop} swapShop - The swap shop involved in the transactions.
 * @property {ArticleTransaction[]} requestedArticles - The articles involved in the transactions.
 */
interface Transactions {
  type: string;
  user: User | null;
  swapShop: SwapShop;
  
  requestedArticles: ArticleRequest[];
}

/**
 * Defines a requested Article.
 * 
 * @interface
 * 
 * @property {Article} article - The article requested.
 * @property {number} quantity - The requested quantity of the article.
 */
interface ArticleRequest {
  article: Article;
  quantity: number;
}