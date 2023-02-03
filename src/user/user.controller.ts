import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Post('/log-in')
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.service.logIn(email, password);
  }
}
