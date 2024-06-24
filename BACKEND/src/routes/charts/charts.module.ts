import { Module } from '@nestjs/common';
import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users/User.entity';
import { SwapShop } from '~/entities/swapShops/SwapShop.entity';
import { Article } from '~/entities/articles/Article.entity';

@Module({
  controllers: [ChartsController],
  providers: [ChartsService],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([SwapShop]),
    TypeOrmModule.forFeature([Article]),
  ],
})
class ChartsModule {}

export { ChartsModule };