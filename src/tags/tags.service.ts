import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tagsIds: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tagsIds),
      },
    });
  }

  public async delete(tagId: number) {
    return await this.tagsRepository.softDelete({ id: tagId });
  }
}
