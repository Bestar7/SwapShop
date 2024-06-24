import { Controller, Get } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller("charts")
class ChartsController {

  constructor(
    private readonly chartsService: ChartsService,
  ){}

  @Get('nbrArticlePerUser')
  async getNbrArticlePerUser(): Promise<number> {
    return await this.chartsService.getNbrArticlePerUser();
  }
}

export {ChartsController}