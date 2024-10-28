import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const admin = await this.authService.validateAdmin(loginDto.username, loginDto.password);
    return this.authService.login(admin);
  }
}