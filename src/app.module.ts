import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HerosModule } from './heros/heros.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://walimalik496:sZMUvQnuKdDllFOV@nestjslearning.wn4ak.mongodb.net/hero-record-db?retryWrites=true&w=majority&appName=nestjslearning',
    ),
    HerosModule,
    AdminModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MoviesService],
})
export class AppModule {}