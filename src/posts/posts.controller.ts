import { Controller, Get } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(readonly postsService: PostsService) {}

  @Get()
  public getPosts() {
    return this.postsService.getAllPosts();
  }
}
