import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
    SECRET: new ConfigService().get<string>('JWT_SECRET')
}