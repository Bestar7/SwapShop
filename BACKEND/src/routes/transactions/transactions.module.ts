import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '~/entities/transaction/Transaction.entity';
import { Article } from '~/entities/articles/Article.entity';
import { User } from '~/entities/users/User.entity';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([Transaction, User, Article]),
  ],
  exports: [], // TODO export service to make it avilable to everyone (see https://docs.nestjs.com/modules#shared-modules)
})
class TransactionsModule {}

export { TransactionsModule };