import {  MiddlewareConsumer, Module, RequestMethod,  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './lib/typeorm.config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from './lib/serveFile.config';

import { UsersModule } from './routes/users/users.module'; // meilleurs notation, alias vers routes ?
import { ArticlesModule } from './routes/articles/articles.module';
import { ImagesModule } from './routes/images/images.module';
import { SwapShopsModule } from './routes/swapShops/swapShops.module';
import { TransactionsModule } from './routes/transactions/transactions.module';
import { TagsModule } from './routes/tags/tags.module';
import { MaterialsModule } from './routes/materials/materials.module';
import { ChartsModule } from './routes/charts/charts.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot(config),
    TypeOrmModule.forRoot(ormConfig), 
    UsersModule,
    ArticlesModule,
    ImagesModule,
    SwapShopsModule,
    TransactionsModule,
    TagsModule,
    MaterialsModule,
    ChartsModule,
  ],
})
class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

export {AppModule}