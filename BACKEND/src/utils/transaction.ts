/**
 * Extracts the IDs of the articles from a given transaction.
 * 
 * @param {TransactionsInterface} transactions - The transaction from which to extract the article IDs.
 * @returns {number[]} An array of article IDs.
 */
const getArticlesIdsFromTransaction = (transactions: TransactionsInterface): number[] => {
  return transactions.requestedArticles.map((elem)=>{return elem.article.id});
}

/**
 * Retrieves the requested quantity for a specific article in a given transaction.
 * 
 * @param {TransactionsInterface} transactions - The transaction from which to retrieve the quantity.
 * @param {number} idArticle - The ID of the article for which to retrieve the quantity.
 * @param {number} [guessedIndex] - An optional index to speed up the search. If provided and the article at this index has the given ID, the function will return the quantity without searching the entire array.
 * @returns {number} The requested quantity for the article.
 */
const getRequestedQtyForArticle = (transactions: TransactionsInterface, idArticle: number, guessedIndex?: number): number => {
  if (guessedIndex && transactions.requestedArticles[guessedIndex].article.id === idArticle)
    return transactions.requestedArticles[guessedIndex].quantity;
  return transactions.requestedArticles.find((elem)=>{return elem.article.id === idArticle}).quantity;
}

export { getArticlesIdsFromTransaction, getRequestedQtyForArticle }