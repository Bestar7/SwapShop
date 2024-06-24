import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";
import { Article } from "../articles/Article.entity";
import { SwapShop } from "../swapShops/SwapShop.entity";

/**
 * @enum
 * @example
 * TypeTransactionEnum.MEMBERSHIP : the client joined and was gifted shop money on entry
 * TypeTransactionEnum.FAVOUR : the client gave a service for the shop and was paid shop money for it
 * TypeTransactionEnum.DEPOSIT : the client want to sell an item
 * TypeTransactionEnum.WITHDRAWAL : the client want to buy an item
 */
enum TypeTransactionEnum {
  MEMBERSHIP = 'membership',
  FAVOUR = 'favour',
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

@Entity()
class Transaction implements TransactionInterface{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(()=>User) // TODO more complete ???
  user: UserInterface;

  @ManyToOne(()=>SwapShop) // TODO more complete ??? Not needed, it is present in article
  swapShop: SwapShopInterface;

  @ManyToOne(()=>Article, { nullable: true }) // TODO more complete ???
  article?: ArticleInterface;

  @Column({ type:'float', scale: 2,
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  pricePerUnit: number;

  @Column()
  quantity: number;

  @Column({ type:'float', scale: 2,
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  total: number;

  @Column({ default: 0, type:'float', scale: 2,
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  discount: number;

  @Column({ default: new Date() })
  date: Date;

  createTransaction(article: ArticleInterface, qty: number, typeTransaction: string, user: UserInterface){
    // For who
    this.user = user;
    this.swapShop = {id: article.storingShopId} as SwapShopInterface; // only id is needed

    // what kind of transaction
    this.type = typeTransaction;

    // About what
    this.quantity = qty;
    this.pricePerUnit = article.price;
    this.total = article.price * qty;
    this.article = article;

    // When
    this.date = new Date();    
  }
}

export { Transaction, TypeTransactionEnum }