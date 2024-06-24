import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from '../articles/Article.entity';

@Entity()
class Image implements ImageInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  // TODO add host (http://localhost:3000/) + filename (/uploads/filename.jpg) ??? see more
  // TODO localhost will be replaced with 198.162.173.155 ???

  @ManyToOne(()=>Article, article=>article.images)
  article?: ArticleInterface;
}

export { Image }