import { IsArray, IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, Min, ValidateIf, ValidateNested } from 'class-validator';
import { TagDTO } from '../tags/Tag.dto';
import { Type } from 'class-transformer';

class ArticleDTO implements ArticleInterface{
  id?: number;
  storingShopId?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  category?: MaterialInterface;

  @IsDefined()
  @IsNumber()
  @Min(0)
  price: number;
  description: string;

  @IsDefined()
  @IsInt()
  @Min(0)
  condition: number;

  @ValidateIf((obj: ArticleDTO) => obj.weight !== undefined && obj.weight !== null)
  @IsNumber()
  @Min(0)
  weight?: number;

  @ValidateIf((obj: ArticleDTO) => obj.dimension !== undefined && obj.dimension !== null)
  @IsNumber()
  @Min(0)
  dimension?: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  quantity: number;

  //@IsEmpty()
  submittedDate?: Date;
  images?: ImageInterface[];

  @IsArray()
  @ValidateNested()
  @Type(() => TagDTO)
  tags?: TagDTO[];

}

export { ArticleDTO }