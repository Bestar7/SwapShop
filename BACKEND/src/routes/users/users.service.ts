import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '~/entities/users/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryError } from '~/utils/typeorm';

/**
 * UsersService manage communication between the backend app, and the database
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(newUser: UserInterface): Promise<UserInterface> {
    let user: UserInterface;
    const createdUser:User = this.userRepo.create(newUser);
    if (!createdUser.isPasswordStrong())
      throw new BadRequestException('Password is not strong enough');
    await createdUser.hashPassword();

    try {
      user = await this.userRepo.save(await createdUser);
    } catch (error) {
      if (error.code === QueryError.duplicateUnique)
        throw new ConflictException('Email already in use');
      else {
        throw new InternalServerErrorException("Unexpected error");
      }
    }

    return user;
  }

  async getOneUserById(id:number): Promise<UserInterface> {
    let user: UserInterface;

    try {
      user = await this.userRepo.findOne({where: {id: id}});
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }

    if (!user)
      throw new NotFoundException('No user found');
    return user;
  }

  async getOneUserByEmail(email:string): Promise<UserInterface> {
    let user: UserInterface;

    try {
      user = await this.userRepo.findOne({where: {email: email}});
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }

    if (!user)
      throw new NotFoundException('No user found');
    return user;
  }

  async getAllUsersSummary(): Promise<UserSummaryInterface[]> {
    let users: UserSummaryInterface[];

    try {
      users = await this.userRepo.find({
        select: {
          id:true, email:true, firstName:true, lastName:true
        },
        order: {
          lastName: 'ASC', firstName: 'ASC'
        }
      });
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }

    if (!users || users.length === 0)
      throw new NotFoundException('No user found');
    return users;
  }

  async getAllUsers(): Promise<UserInterface[]> {
    let users: UserInterface[];

    try {
      users = await this.userRepo.find();
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }

    if (!users || users.length === 0)
      throw new NotFoundException('No user found');
    return users;
  }

  async connectUser(email:string, password: string): Promise<UserInterface> {
    let user: User;
    
    try {
      user = await this.userRepo.findOne({
        select: {
          id:true, email:true, role:true, password:true, wallet:true
        },
        where: {email: email}
      });
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
    
    if(user && await user.verifyPassword(password)){
      user.password = "";
      return user;
    }

    throw new UnauthorizedException("Wrong credentials");
  }
}