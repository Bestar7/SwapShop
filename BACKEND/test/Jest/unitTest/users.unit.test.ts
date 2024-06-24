import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersService } from '~/routes/users/users.service';
import { UsersController } from '~/routes/users/users.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { UserRole } from '~/entities/users/User.entity';
import { Reflector } from '@nestjs/core';

const route = '/users'

const adminValid = {id:1, role: UserRole.ADMIN} as UserInterface;
//const shopValid = {id:2, role: UserRole.SHOP} as UserInterface;
//const userValid = {id:3, role: UserRole.USER} as UserInterface;

const mockService: Omit<UsersService, 'getAllUsersSummary'> = {
  createUser: function (newUser: UserInterface): Promise<UserInterface> {
    return Promise.resolve(adminValid);
  },
  getOneUserById: function (id: number): Promise<UserInterface> {
    return Promise.resolve(adminValid);
  },
  getOneUserByEmail: function (email: string): Promise<UserInterface> {
    return Promise.resolve(adminValid);
  },
  getAllUsers: function (): Promise<UserInterface[]> {
    return Promise.resolve([adminValid]);
  },
  connectUser: function (email: string, password: string): Promise<UserInterface> {
    return Promise.resolve(adminValid);
  }
};

describe('Users mockService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    })
      .overrideProvider(UsersService).useValue(mockService)
      .overrideProvider(JwtService).useValue(mockJwt)
      .overrideGuard(AuthGuard).useValue(mockGuard)
      .compile();
      
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })); // JSON->JS object (and more)
    app.useGlobalInterceptors( // Allows the use of class-transform and class validator
      new ClassSerializerInterceptor(app.get(Reflector))
    );
    await app.init();
  });


  it(`/GET/me`, () => {
    return request.default(app.getHttpServer())
      .get(`${route}/me`)
      .expect(200);
  });
  it(`/GET/1`, () => {
    return request.default(app.getHttpServer())
      .get(`${route}/1`)
      .expect(200);
  });
  it(`/GET`, () => {
    return request.default(app.getHttpServer())
      .get(`${route}`)
      .expect(200);
  });
  it(`/POST/connect`, () => {
    return request.default(app.getHttpServer())
      .post(`${route}/connect`)
      .send({email:"mail@mail.com", password:"password"})
      .expect(201);
  });


  afterAll(async () => {
    await app.close();
  });
});

const mockGuard = {
  canActivate: jest.fn((context: ExecutionContext):boolean => {
    context.switchToHttp().getRequest()['user'] = adminValid;
    return true;
  })
}

const mockJwt = {
  verifyAsync: jest.fn(():UserJwtPayload => {return {id:1} as UserJwtPayload}),
  signAsync: jest.fn(():string=>{return "token"}), 
}