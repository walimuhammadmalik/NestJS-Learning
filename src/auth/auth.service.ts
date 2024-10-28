import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
// import { AdminModel } from '..'; // Adjust the import as necessary

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return admin;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(admin: Admin) {
    const payload = { email: admin.email, sub: admin._id, role: 'Admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
