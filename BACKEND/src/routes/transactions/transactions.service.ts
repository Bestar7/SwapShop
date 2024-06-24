import { BadRequestException, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Article } from '~/entities/articles/Article.entity';
import { Transaction, TypeTransactionEnum } from '~/entities/transaction/Transaction.entity';
import { User } from '~/entities/users/User.entity';
import { getArticlesIdsFromTransaction, getRequestedQtyForArticle } from '~/utils/transaction';

/**
 * TransactionsService manage communication between the backend app, and the database
 */
@Injectable()
class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async createTransactions(transactions: TransactionsInterface): Promise<TransactionInterface[]>  {
    let error: HttpException;
    let returnEntities: TransactionInterface[];
    const entitiesToSave: TransactionInterface[] = [];

    let total = 0;
    const articlesId: number[] = getArticlesIdsFromTransaction(transactions);

    await this.transactionRepo.manager.transaction(async transactionManager => {
      const concernedArticles: Article[] = await transactionManager.find(Article, {
        where: { id: In(articlesId) },
        select: { id: true, price: true, storingShopId: true, quantity: true },
        // relations: {  }, // might be needed if Article.entity has OneToMany relation
      });
      console.log("concernedArticles.storingShopId", concernedArticles[0].storingShopId);
      const concernedUser: UserInterface = await transactionManager.findOne(User, {
        where: {id: transactions.user.id},
      });

      // CREATE TRANSACTIONS
      for (let i=0; i<concernedArticles.length; i++){ // a foreach loop would crash the server on a 'throw new ...' :'(
        const article = concernedArticles[i];
        if (article.storingShopId !== transactions.swapShop.id)
          throw new BadRequestException("Article " + article.id + " is not stored in this swap shop");

        const requestedQty = getRequestedQtyForArticle(transactions, article.id, i);
        const transac = transactionManager.create(Transaction);
        transac.createTransaction(article, requestedQty, transactions.type, concernedUser);

        total += transac.total;

        // UPDATE ARTICLE QUANTITY
        await updateArticleQuantity(transactionManager, article, requestedQty, transactions.type);
        
        entitiesToSave.push(transac);
      }

      // UPDATE USER WALLET
      await updateUserWallet(transactionManager, concernedUser, total, transactions.type);
      returnEntities = await transactionManager.save(entitiesToSave);

    }).catch(err => {
      error = err;
    });

    if (error) throw new BadRequestException(error.message);
    return returnEntities;
  }
}

/**
 * Updates the wallet of a user based on a transaction.
 * 
 * @param {EntityManager} transactionManager - The transaction manager to handle database transactions.
 * @param {User} user - The user whose wallet is to be updated.
 * @param {number} total - The total price of all the current transaction to update the user's wallet by.
 * @param {TypeTransactionEnum} type - The type of transaction (e.g., purchase, sale, exchange).
 * @returns {Promise<void>} A promise that resolves when the user's wallet has been updated.
 */
const updateUserWallet = async(
  transactionManager:EntityManager, user:UserInterface, total:number, type:string
): Promise<void> => {
  if (type === TypeTransactionEnum.WITHDRAWAL){
    if (user.wallet < total)
      throw new BadRequestException('User wallet is not enough');
    user.wallet -= total;
  } else {
    user.wallet += total;
  }
  transactionManager.save(user);
}

/**
 * Updates the stock of articles based on a transaction.
 * 
 * @param {EntityManager} transactionManager - The transaction manager to handle database transactions.
 * @param {Article[]} article - The articles whose stock is to be updated.
 * @param {number[]} requestedQty - The quantities to update the articles' stock by.
 * @param {TypeTransactionEnum} type - The type of transaction (e.g., purchase, sale, exchange).
 * @returns {Promise<void>} A promise that resolves when the articles' stock has been updated.
 */
const updateArticleQuantity = async(
  transactionManager:EntityManager, article:ArticleInterface, requestedQty:number, type:string
): Promise<void> => {
  if ( type === TypeTransactionEnum.WITHDRAWAL){
    if (article.quantity < requestedQty)
      throw new BadRequestException('Not enough quantity in the storage shop');
    article.quantity -= requestedQty;
  } else {
    article.quantity += requestedQty;
  }
  await transactionManager.save(article);
}

export { TransactionsService };