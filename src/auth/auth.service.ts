import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import { UserEntity } from '../user/entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) {}

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;
    
    // Buscar el usuario por email
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['person']
    });

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return { message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña' };
    }

    try {
      // Generar token temporal para reset (válido por 1 hora)
      const resetToken = this.jwtService.sign(
        { 
          sub: user.pkUser, 
          email: user.email, 
          type: 'password-reset' 
        },
        { expiresIn: '1h' }
      );

      // Enviar email con el token
      const userName = user.person ? `${user.person.firstName} ${user.person.lastName}`.trim() : undefined;
      
      await this.mailerService.sendPasswordReset({
        email: user.email,
        token: resetToken,
        userName: userName || user.email,
      });

      return { message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña' };
    } catch (error) {
      console.error('Error en forgot password:', error);
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, password } = resetPasswordDto;

    try {
      // Verificar y decodificar el token
      const decoded = this.jwtService.verify(token);
      
      // Verificar que es un token de reset de contraseña
      if (decoded.type !== 'password-reset') {
        throw new HttpException(
          'Token inválido',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Buscar el usuario
      const user = await this.userRepository.findOne({ 
        where: { pkUser: decoded.sub } 
      });

      if (!user) {
        throw new HttpException(
          'Usuario no encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      // Verificar que el email del token coincide con el del usuario
      if (user.email !== decoded.email) {
        throw new HttpException(
          'Token inválido',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Generar hash de la nueva contraseña
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Actualizar la contraseña en la base de datos
      await this.userRepository.update(
        { pkUser: user.pkUser },
        { password: hashedPassword }
      );

      return { message: 'Contraseña restablecida exitosamente' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      // El token probablemente expiró o es inválido
      throw new HttpException(
        'Token inválido o expirado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { pkUser, currentPassword, newPassword } = changePasswordDto;

    // Buscar el usuario
    const user = await this.userRepository.findOne({ 
      where: { pkUser } 
    });

    if (!user) {
      throw new HttpException(
        'Usuario no encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    // Verificar la contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      throw new HttpException(
        'Contraseña actual incorrecta',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Verificar que la nueva contraseña no sea igual a la actual
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    
    if (isSamePassword) {
      throw new HttpException(
        'La nueva contraseña debe ser diferente a la actual',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generar hash de la nueva contraseña
    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    await this.userRepository.update(
      { pkUser },
      { password: hashedNewPassword }
    );

    return { message: 'Contraseña cambiada exitosamente' };
  }
}
