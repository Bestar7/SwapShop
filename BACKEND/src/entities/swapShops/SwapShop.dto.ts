import { IsDefined, IsInt, IsNotEmpty, IsString, Min, ValidateIf } from "class-validator";

class SwapShopDTO implements SwapShopInterface {
  @ValidateIf((obj: SwapShopDTO) => obj.id !== undefined && obj.id !== null)
  @IsInt()
  @Min(1)
  id: number;

  @ValidateIf((obj: SwapShopDTO) => obj.federation !== undefined && obj.federation !== null)
  @IsString()
  federation?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((obj: SwapShopDTO) => obj.description !== undefined && obj.description !== null)
  @IsString()
  description?: string;
}

export { SwapShopDTO };