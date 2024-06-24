import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller("tags")
class TagsController {

  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAll(): Promise<string[]> {
    return (await this.tagsService.getAllTags()).map((tag) => tag.label);
  }
}

export { TagsController };