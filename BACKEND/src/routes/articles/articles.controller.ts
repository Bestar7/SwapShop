import { Controller, Get, Post, Body, Param, Put, NotFoundException, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { UserRole } from '~/entities/users/User.entity';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Roles } from '~/decorator/role.decorator';
import { ArticleDTO } from '~/entities/articles/Article.dto';

@Controller("articles")
class ArticlesController {

  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ArticleInterface> {
    // todo check id valid && handle case id doesn't exists
    if (!id || id < 1 || id % 1 !== 0)
      throw new BadRequestException("id must be a positive number");
    const articleFound = await this.articlesService.getOneArticle(id);
    if (!articleFound)
      throw new NotFoundException('Article not found');

    return articleFound;
  }

  @Get()
  async getAll(@Query() param: {tags?:string[], name?:string}): Promise<ArticleInterface[]> {
    const articles = await this.articlesService.getAllArticles(param);
    return articles;
  }

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() article: ArticleDTO): Promise<ArticleInterface> {
    const articleCreated = await this.articlesService.createArticle(article);
    return articleCreated;
  }

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Put()
  async updateArticle(@Body() article: ArticleDTO): Promise<ArticleInterface> {
    try {
      const articleUpdated = await this.articlesService.updateArticle(article);
      return articleUpdated;
    } catch (error) {
      throw error;
    }
    
  }
}

export { ArticlesController };