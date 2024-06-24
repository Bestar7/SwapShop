import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '~/entities/images/Image.entity'; // TODO use better notation
import { Article } from '~/entities/articles/Article.entity';

/**
 * ImagesService manage communication between the backend app, and the database
 */
@Injectable()
export class ImagesService {

  constructor(
    @InjectRepository(Image)
    private imageRepo: Repository<Image>,

    @InjectRepository(Article)
    private articleRepo: Repository<Article>
  ) {}

  async createManyImages(newImages: ImageInterface[], idArticle: number, serverUrl: string): Promise<Image[]> {
    const article = await this.articleRepo.findOne({where: {id: idArticle}});
    if (!article)
      throw new NotFoundException('Corresponding article not found');

    try {
      const listImages: Image[] = [];

      newImages.forEach(async image => {
        const newImage = this.imageRepo.create(image);
        newImage.article = article;
        newImage.path = `http://${serverUrl}/${image.path}`;
        const savedImage = await this.imageRepo.save(newImage);
        listImages.push(savedImage);
      });

      return listImages; // TODO maybe shouldn't return anything ???
    } catch (error) {
      throw new InternalServerErrorException('Error while creating images');
    }
    
  }
}