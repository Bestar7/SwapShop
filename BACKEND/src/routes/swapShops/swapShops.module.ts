import { Module } from '@nestjs/common';
import { SwapShopsController } from './swapShops.controller';
import { SwapShopsService } from './swapShops.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwapShop } from '~/entities/swapShops/SwapShop.entity';

@Module({
  controllers: [SwapShopsController],
  providers: [SwapShopsService],
  imports: [TypeOrmModule.forFeature([SwapShop])],
})
class SwapShopsModule {}

export { SwapShopsModule };