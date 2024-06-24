import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { ArticlesController } from '~/routes/articles/articles.controller';
import { ArticlesService } from '~/routes/articles/articles.service';
import { UsersService } from '~/routes/users/users.service';
import { UserRole } from '~/entities/users/User.entity';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Reflector } from '@nestjs/core';

const route = '/articles'
const mockArticle: ArticleInterface = {
  id: 1,
  name: 'test',
  category: {
    id: 1,
    category: 'plastic',
    subcategory: 'PVC',
    suggestedPrice: 3,
    defaultUnit: 'kg',
  },
  description: 'test',
  price: 10,
  tags: [{ label: 'test' }],
  condition: 1,
  quantity: 1,
}

const mockArticleService: Omit<ArticlesService, 'articleRepo'> = {
  createArticle: function (newArticle: ArticleInterface): Promise<ArticleInterface> {
    return Promise.resolve(mockArticle);
  },
  getOneArticle: function (id: number): Promise<ArticleInterface> {
    return Promise.resolve(mockArticle);
  },
  getAllArticles: function (cndt: { tags?: string[]; name?: string; }): Promise<ArticleInterface[]> {
    return Promise.resolve([mockArticle]);
  },
  updateArticle: function (updatedArticle: ArticleInterface): Promise<ArticleInterface> {
    return Promise.resolve(mockArticle);
  },
};

describe('Articles E2E mockService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService, UsersService, JwtService],
    })
      .overrideProvider(ArticlesService).useValue(mockArticleService)
      .overrideProvider(UsersService).useValue(mockUsersServiceAdmin)
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

  describe('ArticleController', ()=>{
    describe('GET /:id', ()=>{
      it('id invalid should return 400', ()=>{
        const invalidId = 0;
        return request.default(app.getHttpServer())
          .get(`${route}/${invalidId}`)
          .expect(400);
      })
      it('id valid should return 200', ()=>{
        const validId = 1;
        return request.default(app.getHttpServer())
          .get(`${route}/${validId}`)
          .expect(200);
      })
    })
    describe('GET /', ()=>{
      it('should return 200', ()=>{
        return request.default(app.getHttpServer())
          .get(`${route}`)
          .expect(200);
      })
    })
    describe('POST /', ()=>{
      it('article valid should return 201', ()=>{
        const validArticle = {...mockArticle};
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(validArticle)
          .expect(201);
      })
      it('article no name should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.name;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no condition should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.condition;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no price should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.price;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no quantity should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.quantity;
        return request.default(app.getHttpServer())
          .post(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
    })
    describe('PUT /', ()=>{
      it('article valid should return 200', ()=>{
        const validArticle = {...mockArticle};
        return request.default(app.getHttpServer())
          .put(`${route}`)
          .send(validArticle)
          .expect(200);
      })
      it('article no name should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.name;
        return request.default(app.getHttpServer())
          .put(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no condition should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.condition;
        return request.default(app.getHttpServer())
          .put(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no price should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.price;
        return request.default(app.getHttpServer())
          .put(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
      it('article no quantity should return 400', ()=>{
        const invalidArticle = {...mockArticle};
        delete invalidArticle.quantity;
        return request.default(app.getHttpServer())
          .put(`${route}`)
          .send(invalidArticle)
          .expect(400);
      })
    })
  })

  afterAll(async () => {
    await app.close();
  });
});

const adminValid: UserInterface = {id:1, role: UserRole.ADMIN} as UserInterface;

const mockUsersServiceAdmin = { getOneUserById: (id:number) => adminValid };

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