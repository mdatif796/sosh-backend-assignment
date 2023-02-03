import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.DATABASE_PASS}@cluster0.lymyd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
