import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(readonly postsService: PostsService) {}

  @Get()
  public getPosts() {
    return this.postsService.getAllPosts();
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch('/:id')
  public updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostDto: PatchPostDto,
  ) {
    return this.postsService.update(id, patchPostDto);
  }
}
