import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HerosModule } from './heros/heros.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://walimalik496:sZMUvQnuKdDllFOV@nestjslearning.wn4ak.mongodb.net/hero-record-db?retryWrites=true&w=majority&appName=nestjslearning',
    ),
    HerosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}