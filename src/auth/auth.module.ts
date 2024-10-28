import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { AdminModel } from './admin.model'; // Adjust the import as necessary
import { Admin } from '../schemas/admin.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Use a secure key
      signOptions: { expiresIn: '60s' }, // Adjust options as needed
    }),
  ],
  providers: [AuthService, Admin],
  exports: [AuthService],
})
export class AuthModule {}
