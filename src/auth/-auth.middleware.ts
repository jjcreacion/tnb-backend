import { AuthService } from "@/auth/auth.service";
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {} // Inyecta el servicio

  async use(req: Request, res: Response, next: () => void) {
    //later//original//const {auth} = req.headers;
    const authHeader = req.headers.authorization;

    if( !authHeader){ /* throw new NotFoundException() */ }

    /*if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }*/

    //Later//const token = authHeader.split(' ')[1]; // Obtiene el token (quita "Bearer ")
    //Later//const payload = await this.authService.verifyToken(token);

    /*if (!payload) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }*/
    console.log(`autmiddleware`);
    next();
  }
}
