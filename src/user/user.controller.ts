import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create-user')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Post('/log-in')
  async logIn(@Request() req) {
    console.log(req.body);
    return await this.service.logIn(req.body);
  }
}
