import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from '~/lib/jwt.config';

@Global() // To make UsersService available everywhere (needed by ArticleModule (and more), for isRole.guard)
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule.register(config),
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService],
})
class UsersModule {}

export { UsersModule };