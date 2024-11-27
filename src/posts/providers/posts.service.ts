import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async getAllPosts() {
    return await this.postsRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
  }

  public async create(createPostDto: CreatePostDto) {
    const author = await this.usersService.getUserById(createPostDto.authorId);

    const allTags = await this.tagsService.findMultipleTags(createPostDto.tags);

    const post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: null,
      author,
      tags: allTags,
    });

    return await this.postsRepository.save(post);
  }

  public async delete(postId: number) {
    return await this.postsRepository.delete({ id: postId });
  }

  public async update(postId: number, patchPostDto: PatchPostDto) {
    // find the post
    const post = await this.postsRepository.findOneBy({ id: postId });

    // find new tags
    const newTags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    const updatedPost: Post = {
      ...post,
      ...patchPostDto,
      metaOptions: null,
      tags: newTags,
    };

    return await this.postsRepository.save(updatedPost);
  }
}
