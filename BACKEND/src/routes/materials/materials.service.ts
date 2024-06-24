import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '~/entities/materials/Material.entity'; // TODO use better notation

/**
 * ImagesService manage communication between the backend app, and the database
 */
@Injectable()
export class MaterialsService {

  constructor(
    @InjectRepository(Material)
    private materialRepo: Repository<Material>
  ) {}

  async getAllMaterialsDivided() : Promise<MaterialInterface[]> {
    let materials: MaterialInterface[];
    
    try {
      materials = await this.materialRepo.find();
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }

    if (!materials || materials.length === 0)
      throw new NotFoundException('No material found');
    return materials;
  }
}