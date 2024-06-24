import { Controller, Get } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller("materials")
class MaterialsController {

  constructor(private readonly materialsServices: MaterialsService) {}

  @Get()
  async getAllDivided(): Promise<MaterialInterface[]> {
    return this.materialsServices.getAllMaterialsDivided();
  }
}

export { MaterialsController };