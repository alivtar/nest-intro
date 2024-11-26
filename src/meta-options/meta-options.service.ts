import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOption } from './meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostMetaOptionDto: CreatePostMetaOptionsDto) {
    const postMetaOption = this.metaOptionsRepository.create(
      createPostMetaOptionDto,
    );

    return await this.metaOptionsRepository.save(postMetaOption);
  }
}
