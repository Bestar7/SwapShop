import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { TagsController } from '~/routes/tags/tags.controller';
import { TagsService } from '~/routes/tags/tags.service';
import { Reflector } from '@nestjs/core';

const route = '/tags'

const tagList = [{label:'Bleu'}, {label:'Artwork'}]

describe('Tags E2E mockService', () => {
  let app: INestApplication;
  let mockService = { getAllTags: () => tagList};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    })
      .overrideProvider(TagsService).useValue(mockService)
      .compile();
      
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })); // JSON->JS object (and more)
    app.useGlobalInterceptors( // Allows the use of class-transform and class validator
      new ClassSerializerInterceptor(app.get(Reflector))
    );
    await app.init();
  });

  describe('TagController', ()=>{
    describe('GET /', ()=>{
      it(`should return 200`, () => {
        return request.default(app.getHttpServer())
          .get(`${route}`)
          .expect(200);
      });
      it(`should return string array`, () => {
        return request.default(app.getHttpServer())
          .get(`${route}`)
          .expect(
            tagList.map((tag) => tag.label)
          );
      });
    })
  })
  

  afterAll(async () => {
    await app.close();
  });
});