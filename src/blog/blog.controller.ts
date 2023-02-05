import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  Body,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('api')
export class BlogController {
  constructor(private service: BlogService) {}

  @Post('/blog')
  async create(@Request() req, @Body() createBlogDto: CreateBlogDto) {
    return await this.service.create(createBlogDto, req.user._id);
  }

  @Put('/blog/:blogId')
  async edit(@Param('blogId') blogId: string, @Request() req) {
    return await this.service.update(blogId, req.user.email, req.body);
  }

  @Delete('/blog/:blogId')
  async delete(@Param('blogId') blogId: string, @Request() req) {
    return await this.service.delete(blogId, req.user.email);
  }
}
