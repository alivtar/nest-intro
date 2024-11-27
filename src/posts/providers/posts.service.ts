import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async getAllPosts() {
    return await this.postsRepository.find({
      relations: {
        author: true,
      },
    });
  }

  public async create(createPostDto: CreatePostDto) {
    const author = await this.usersService.getUserById(createPostDto.authorId);

    const post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: null,
      author,
    });

    return await this.postsRepository.save(post);
  }
}
