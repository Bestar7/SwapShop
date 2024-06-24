import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from '~/entities/articles/Article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [TypeOrmModule.forFeature([Article])],
})
class ArticlesModule {}

export { ArticlesModule };