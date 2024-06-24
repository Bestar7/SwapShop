import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '~/entities/articles/Article.entity';
import { SwapShop } from '~/entities/swapShops/SwapShop.entity';
import { User } from '~/entities/users/User.entity';
/**
 * ChartsService manage communication between the backend app, and the database
 */
@Injectable()
export class ChartsService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(SwapShop)
    private shopRepo: Repository<SwapShop>,
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
    
  ) {}

  async getNbrArticlePerUser(): Promise<number> {
    const users = await this.userRepo.findAndCount({
      relations: {  }
    });
    console.log("useless", this.shopRepo, this.articleRepo, users);
    return 2;
  }
}