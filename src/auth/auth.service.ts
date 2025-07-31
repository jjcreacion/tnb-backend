import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    console.log(`-----------------------generatetoken`);
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    console.log(`------------------------verifyToken`);
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      return null; // O puedes lanzar una excepción si prefieres manejarla en el middleware
    }
  }
}
