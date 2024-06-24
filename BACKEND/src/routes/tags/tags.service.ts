import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Tag } from '~/entities/tags/Tag.entity'; // TODO use better notation
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * TagsService manage communication between the backend app, and the database
 */
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>
  ) {}

  async getAllTags(): Promise<TagInterface[]> {
    try {
      return await this.tagRepo.find();
    } catch (error) {
      throw new InternalServerErrorException("Unexpected error");
    }
  }
}