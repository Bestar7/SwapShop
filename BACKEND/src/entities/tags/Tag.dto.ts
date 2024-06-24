import { IsNotEmpty, IsString } from "class-validator";

class TagDTO implements TagInterface {
  @IsNotEmpty()
  @IsString()
  label:string;
}

export { TagDTO };