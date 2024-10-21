import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello IR Solutions!';
  }
  getAbout() {
    return {
      message: 'This is a simple API built with NestJS and About IR Solutions',
    };
  }
}
