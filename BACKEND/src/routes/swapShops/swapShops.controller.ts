import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SwapShopsService } from './swapShops.service';
import { UserRole } from '~/entities/users/User.entity';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Roles } from '~/decorator/role.decorator';
import { SwapShopDTO } from '~/entities/swapShops/SwapShop.dto';

@Controller("swapShops")
class SwapShopsController {

  constructor(private readonly swapShopsService: SwapShopsService) {}

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SwapShopInterface> {
    // todo check id valid && handle case id doesn't exists
    return this.swapShopsService.getOneSwapShop(id);
  }

  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard)
  @Post() // TODO not needed ?
  async createSwapShop(@Body() swapShop: SwapShopDTO): Promise<SwapShopInterface> {
    // todo check required field present
    return this.swapShopsService.createSwapShop(swapShop);
  }
}

export { SwapShopsController };