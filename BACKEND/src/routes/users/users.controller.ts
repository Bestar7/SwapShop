import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from '~/entities/users/User.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Roles } from '~/decorator/role.decorator';
import { CredentialsDto, UserCreateDTO } from '~/entities/users/User.dto';

@Controller("users")
class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Roles([])
  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request): Promise<{token: string, user: UserInterface}> {
    const user = req['user'];
    const jwtPayload: UserJwtPayload = {
      id:user.id,
    }
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return {token: jwtToken, user: user};
  }

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Get('summary')
  async getAllSummary(): Promise<UserSummaryInterface[]> {
    return this.usersService.getAllUsersSummary();
  }

  // Be careful where you place this (:id capture ANY string/number, even if it's not supposed to be a param but a route)
  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard) // TODO User should see their own but not others
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<UserInterface> {
    // todo check id valid
    return this.usersService.getOneUserById(id);//TODO verify id positive && exist, handle case id doesn't exists
  }

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<UserInterface[]> {
    return this.usersService.getAllUsers();
  }

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() user: UserCreateDTO): Promise<{token: string, user: UserInterface}> {
    const createdUser = await this.usersService.createUser(user);
    const jwtPayload: UserJwtPayload = {
      id:createdUser.id,
    }
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return {token: jwtToken, user: createdUser};
  }

  @Post('connect')
  async connectUser(@Body() {email, password}: CredentialsDto ): Promise<{token: string, user: UserInterface}> {
    // todo check required field present
    const connectedUser = await this.usersService.connectUser(email, password);
    const jwtPayload: UserJwtPayload = {
      id: connectedUser.id,
    }
    const jwtToken = await this.jwtService.signAsync(jwtPayload);
    return {token: jwtToken, user: connectedUser};
  }
}

export { UsersController };