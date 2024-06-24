import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { Material } from '~/entities/materials/Material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService],
  imports: [TypeOrmModule.forFeature([Material])],
  exports: [], // TODO export to make it available to everyone (see https://docs.nestjs.com/modules#shared-modules)
})
class MaterialsModule {}

export { MaterialsModule };