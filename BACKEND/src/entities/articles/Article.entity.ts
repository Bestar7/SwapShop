import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinTable, BeforeInsert, Check } from 'typeorm';
import { Image } from '../images/Image.entity';
import { Tag } from '../tags/Tag.entity'
import { Material } from '../materials/Material.entity';

@Entity()
class Article implements ArticleInterface {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true }) // TODO should not be null
  storingShopId: number; // TODO OneToMany ?

  @Column()
  name: string;

  @ManyToOne(()=>Material, (material)=>material.article)
  category: MaterialInterface;

  @Check('"price" >= 0')
  @Column({ 
    type:'float', scale: 3, 
    transformer: { to: (value: number) => {if (value) return value.toFixed(3)}, from: (value: string) => Number(value)}
  })
  price: number;
  
  @Column({length: 2000, nullable: true})
  description: string;

  @Column()
  @Check('"condition" >= 0')
  condition: number;

  @Check('"weight" >= 0')
  @Column({ 
    nullable: true, type:'float', scale: 3, 
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  weight: number;

  @Check('"dimension" >= 0')
  @Column({ 
    nullable: true, type:'float', scale: 3, 
    transformer: { to: (value: number) => {if (value) return value.toFixed(2)}, from: (value: string) => Number(value)}
  })
  dimension: number;

  @Check('"quantity" >= 0')
  @Column()
  quantity: number;

  @Column()
  submittedDate: Date;

  @OneToMany(()=>Image, (image)=>image.article)
  images: ImageInterface[];

  
  @ManyToMany(()=>Tag, (tag)=>tag.articles, {cascade: ["insert"]})
  @JoinTable({
    joinColumn: {name: 'articleId', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'tagId', referencedColumnName: 'label'}
  })
  tags: TagInterface[];
  //inverseJoinColumn: {referencedColumnName: 'label'},

  @BeforeInsert()
  beforeInsert(){
    this.submittedDate = new Date();
  }
}

export { Article }