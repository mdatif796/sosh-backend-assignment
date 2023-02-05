import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly model: Model<BlogDocument>,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: string) {
    try {
      const blog = await new this.model({
        ...createBlogDto,
        createdBy: userId,
        createdOn: new Date(),
      }).save();
      return {
        message: 'Blog successfully created',
        blog: blog,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async delete(blogId: string, userEmail: string) {
    try {
      let blog = await this.model.findById(blogId);
      if (!blog) {
        throw new UnauthorizedException();
      }
      blog = await blog.populate('createdBy');
      console.log('blog: ', blog);
      if (blog.createdBy.email !== userEmail) {
        console.log('userEmail: ', userEmail);
        console.log('blog.createdBy.email: ', blog.createdBy.email);
        throw new UnauthorizedException();
      }
      await blog.delete();
      return {
        message: 'blog successfully deleted',
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  async update(blogId: string, userEmail: string, { title, description }) {
    try {
      let blog = await this.model.findById(blogId);
      if (!blog) {
        throw new UnauthorizedException();
      }
      blog = await blog.populate('createdBy');
      if (blog.createdBy.email !== userEmail) {
        throw new UnauthorizedException();
      }

      if (title) {
        blog.title = title;
      }
      if (description) {
        blog.description = description;
      }
      blog = await blog.save();
      return {
        message: 'blog is successfully updated!!',
        blog: {
          id: blog._id,
          title: blog.title,
          description: blog.description,
        },
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
}
