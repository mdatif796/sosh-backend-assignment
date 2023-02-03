import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.service.create(createUserDto);
    console.log('user: ', user);
    if (!user) {
      return {
        message: 'User already exist',
      };
    }
    return {
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
