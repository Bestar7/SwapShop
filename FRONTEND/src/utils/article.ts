enum measureUnit {
  pieces = 'pc',
  weight = 'kg',
  dimension = 'm',
}

/**
 * calculate the suggested price, and returns it
 * @param {Article} article - The article for which to calculate the suggested price.
 * @returns {number} The suggested price for the article.
*/
const getSuggestedPrice = (article: Article): number => {
  return (getItemSpecificMeasure(article) * (article.category?.suggestedPrice ?? 1) * ((article.condition)/5));
}

/**
 * Determines the quantity of the measure unit for a given article.
 * 
 * @param {Article} article - The article for which to determine the measure unit quantity.
 * @returns {number} The quantity of the measure unit for the article.
 */
const getItemSpecificMeasure = (article: Article): number => {
  const defaultMultiplier = 1;

  switch (article.category?.defaultUnit) {
    case measureUnit.weight:
      return (article.weight ?? defaultMultiplier);
    case measureUnit.pieces:
      return defaultMultiplier;
    case measureUnit.dimension:
      return (article.dimension ?? defaultMultiplier);
    default:
      return defaultMultiplier;
  }
}

export { getSuggestedPrice, getItemSpecificMeasure, measureUnit }