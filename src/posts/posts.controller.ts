import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(readonly postsService: PostsService) {}

  @Get()
  public getPosts(@Query() postsQuery: GetPostsDto) {
    console.log('postsQuery', postsQuery);
    return this.postsService.getAllPosts(postsQuery);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Delete('/:id')
  public deletePost(@Param('id', ParseIntPipe) postId: number) {
    return this.postsService.delete(postId);
  }

  @Patch('/:id')
  public updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostDto: PatchPostDto,
  ) {
    return this.postsService.update(id, patchPostDto);
  }
}
