import { IsDefined, IsEmail, IsEmpty, IsInt, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator';
import { UserRole } from './User.entity';

class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

class UserDTO implements UserInterface{

  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ValidateIf((obj: UserDTO) => obj.phone !== undefined && obj.phone !== null)
  @IsString()
  phone?: string;
  
  @ValidateIf((obj: UserDTO) => obj.address !== undefined && obj.address !== null)
  @IsString()
  address?: string;
  
  registrationDate?: Date;
  
  @IsDefined()
  @IsInt()
  wallet: number;
  
  role: UserRole;
}

class UserCreateDTO extends UserDTO {

  @IsEmpty()
  declare id: number;

  @IsNotEmpty()
  @IsString()
  declare password: string;
  
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  declare wallet: number;
  
  @IsEmpty()
  declare role: UserRole;
}

export { UserDTO, UserCreateDTO, CredentialsDto }