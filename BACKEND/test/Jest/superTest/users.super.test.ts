import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfigTest } from 'test/Jest/superTest/typeorm.config';
import { UsersModule } from '~/routes/users/users.module';
import { Reflector } from '@nestjs/core';

const route = '/users'

const userValid:UserInterface = {
  email:`${crypto.randomUUID()}@mail.com`, 
  password:"password646sdf321",
  firstName:"firstName",
  lastName:"lastName",
  wallet: 25,
}

describe('UsersModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot(ormConfigTest),
      ]
    })
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

  describe('POST /users', () => {
    describe("valid user", ()=>{
      let response: request.Response;
      let responseUser: UserInterface;
      const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
      beforeAll(async ()=>{
        response = await request.default(app.getHttpServer())
        .post(`${route}`)
        .send(user);
        responseUser = await response.body.user;
      })
  
      it("should return 201", ()=>{
        expect(response.status).toBe(201);
      })
      it("should not send password (even hashed)", ()=>{
        expect(responseUser.password).toBeFalsy();
      })
      it("should have registrationDate", ()=>{
        expect(responseUser.registrationDate).toBeDefined();
        expect((new Date(responseUser.registrationDate)).getUTCHours()).toBe((new Date()).getUTCHours());
      })
      it("should have id", ()=>{
        expect(responseUser.id).toBeDefined();
      })
    })
    
    describe("invalid user", ()=>{
      it(`weak password should return 400`, () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`, password:"123"};
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(400)
      });
      it(`no firstname should return 400`, () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
        delete user.firstName;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(400)
      });
      it(`no lastName should return 400`, () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
        delete user.lastName;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(400)
      });
      it(`no password should return 400`, () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
        delete user.password;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(400)
      });
      it(`no email should return 400`, () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
        delete user.email;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(400)
      });
      it(`not unique email should return 409`, async () => {
        const user:UserInterface = {...userValid, email:`${crypto.randomUUID()}@mail.com`};
        await request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user);
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(user)
          .expect(409)
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});


const mockGuard = {
  canActivate: jest.fn((context: ExecutionContext):boolean => {
    context.switchToHttp().getRequest()['user'] = {userValid, id:1};
    return true;
  })
}

const mockJwt = {
  verifyAsync: jest.fn(():UserJwtPayload => {return {id:1} as UserJwtPayload}),
  signAsync: jest.fn(():string=>{return "token"}), 
}