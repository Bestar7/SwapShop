import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Article } from '~/entities/articles/Article.entity';
import { Image } from '~/entities/images/Image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Article, Image])],
  exports: [], // TODO export to make it available to everyone (see https://docs.nestjs.com/modules#shared-modules)
})
class ImagesModule {}

export { ImagesModule };