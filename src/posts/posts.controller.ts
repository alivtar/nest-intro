import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

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
}
