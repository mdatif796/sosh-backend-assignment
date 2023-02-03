import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = await this.model.findOne({ email: createUserDto.email });
    if (user) {
      return {
        message: 'User already exist',
      };
    }
    user = await new this.model({
      ...createUserDto,
    }).save();

    return {
      message: 'User created successfully',
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }

  async logIn(email: string, password: string) {
    console.log('email: ', email);
    const user = await this.model.findOne({ email: email });
    if (!user || user.password !== password) {
      return {
        message: 'Invalid username or password',
      };
    }
    const payload = { email: user.email, name: user.name };
    return {
      message: 'User is logged in and access token is generated!!',
      access_token: this.jwtService.sign(payload),
    };
  }
}
