import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Article } from '~/entities/articles/Article.entity'; // TODO use better notation
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';

/**
 * ArticlesService manage communication between the backend app, and the database
 */
@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>
  ) {}

  async createArticle(newArticle: ArticleInterface): Promise<ArticleInterface> {
    try {
      const article = this.articleRepo.create(newArticle);
      return await this.articleRepo.save(article);
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
  }

  async getOneArticle(id:number): Promise<ArticleInterface> {
    try {
      const article = await this.articleRepo.findOne({
        relations: { images: true, tags: true, category: true },
        where: { id: id },
      });
      return article;
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
  }

  //tags?: string[]
  async getAllArticles(cndt: {tags?:string[], name?:string}): Promise<ArticleInterface[]> {

    try {
      const articles = this.articleRepo.find({
        relations: { images: true, tags: true, category: true },
        where: {
          quantity: MoreThan(0),
          ...(cndt.name ? { name:cndt.name } : undefined),
          ...(cndt.tags ? { tags: { label: In(cndt.tags) } } : undefined)
        },
        order: { submittedDate: "DESC" },
      });
      return await articles;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Unexpected error");
    }
  }

  async updateArticle(updatedArticle: ArticleInterface): Promise<ArticleInterface> {
    let exists = false;
    try {
      exists = await this.articleRepo.exists({
        where: {id: updatedArticle.id},
      });
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
    if (!exists){
      throw new NotFoundException("Article Not Found");
    }
    try {
      return this.articleRepo.save(updatedArticle);
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
  }
}