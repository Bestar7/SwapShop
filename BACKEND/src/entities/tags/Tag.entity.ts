import { Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { Article } from '../articles/Article.entity';

@Entity()
class Tag implements TagInterface{

  @PrimaryColumn()
  label: string;

  
  @ManyToMany(()=>Article, (article)=>article.tags)
  articles: ArticleInterface[];
}

export { Tag }