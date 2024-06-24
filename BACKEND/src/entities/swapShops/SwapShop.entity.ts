import { Entity, PrimaryColumn, Column } from 'typeorm';

// TODO add ManyToMany article
@Entity()
class SwapShop implements SwapShopInterface {
  
  @PrimaryColumn()
  id: number;

  @Column()
  federation?: string;

  @Column()
  name: string;

  @Column({ length: 1000 })
  description?: string;
}

export { SwapShop }