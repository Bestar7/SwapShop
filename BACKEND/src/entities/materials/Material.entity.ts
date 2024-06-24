import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../articles/Article.entity';

@Entity()
class Material implements MaterialInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column({ type:'float', scale: 2,
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  suggestedPrice: number;

  @Column()
  defaultUnit: string;

  @OneToMany(()=>Article, (article)=>article.category)
  article: Article;
}


export { Material }