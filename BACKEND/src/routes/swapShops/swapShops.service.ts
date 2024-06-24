import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { SwapShop } from '~/entities/swapShops/SwapShop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryError } from '~/utils/typeorm';

/**
 * ItemsService manage communication between the backend app, and the database
 */
@Injectable()
export class SwapShopsService {
  constructor(
    @InjectRepository(SwapShop)
    private swapShopRepo: Repository<SwapShop>
  ) {}

  async createSwapShop(newSwapShop: SwapShopInterface): Promise<SwapShopInterface> {
    const createdSwapShop = this.swapShopRepo.create(newSwapShop);
    try {
      return await this.swapShopRepo.save(createdSwapShop);
    } catch (error) {
      if (error.code === QueryError.duplicateUnique)
        throw new ConflictException('SwapShop already exists');
      else {
        throw new InternalServerErrorException("Unexpected error");
      }
    }
  }

  async updateSwapShop(newSwapShop: SwapShopInterface): Promise<SwapShopInterface> {
    // TODO implement update swapshop info
    throw new NotImplementedException();
  }

  async getOneSwapShop(id:number): Promise<SwapShopInterface> {
    let swapShop:SwapShopInterface;
    try {
      swapShop = await this.swapShopRepo.findOne({where: {id}})
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
    
    if (!swapShop)
      throw new NotFoundException('Swapshop not found');
    return swapShop;
  }
}