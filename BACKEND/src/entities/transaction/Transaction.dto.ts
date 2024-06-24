import { Type } from "class-transformer";
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, Min, ValidateNested } from "class-validator";
import { ArticleDTO } from "../articles/Article.dto";
import { SwapShopDTO } from "../swapShops/SwapShop.dto";
import { UserDTO } from "../users/User.dto";

class TransactionsDTO implements TransactionsInterface {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject() // TODO only id needed
  user: UserDTO;

  //@IsDefined()
  //@IsObject()
  //@IsNotEmptyObject() //TODO only id needed
  swapShop: SwapShopDTO;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => RequestedArticlesDTO)
  requestedArticles: RequestedArticlesDTO[];
}

class RequestedArticlesDTO  {
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ArticleDTO)
  article: ArticleDTO;

  @IsDefined()
  @IsNumber()
  @Min(1)
  quantity: number;
}

export { TransactionsDTO}