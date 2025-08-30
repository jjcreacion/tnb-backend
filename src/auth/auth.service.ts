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
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      return null; // You can throw an exception if you prefer to handle it in the middleware
    }
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    // Search for user by email
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['person'],
    });

    if (!user) {
      // For security reasons, we don't reveal whether the email exists or not
      return {
        message:
          'If the email exists, you will receive instructions to reset your password',
      };
    }

    try {
      // Generate temporary reset token (valid for 1 hour)
      const resetToken = this.jwtService.sign(
        {
          sub: user.pkUser,
          email: user.email,
          type: 'password-reset',
        },
        { expiresIn: '1h' },
      );

      // Send email with token
      const userName = user.person
        ? `${user.person.firstName} ${user.person.lastName}`.trim()
        : undefined;

      await this.mailerService.sendPasswordReset({
        email: user.email || '',
        token: resetToken,
        userName: userName || user.email || 'User',
      });

      return {
        message:
          'If the email exists, you will receive instructions to reset your password',
      };
    } catch (error) {
      console.error('Error in forgot password:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { token, password } = resetPasswordDto;

    try {
      // Verify and decode the token
      const decoded = this.jwtService.verify(token);

      // Verify that it's a password reset token
      if (decoded.type !== 'password-reset') {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      }

      // Find the user
      const user = await this.userRepository.findOne({
        where: { pkUser: decoded.sub },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Verify that the token email matches the user's email
      if (user.email !== decoded.email) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
      }

      // Generate hash for new password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update password in database
      await this.userRepository.update(
        { pkUser: user.pkUser },
        { password: hashedPassword },
      );

      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Token probably expired or is invalid
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { pkUser, currentPassword, newPassword } = changePasswordDto;

    // Find the user
    const user = await this.userRepository.findOne({
      where: { pkUser },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new HttpException(
        'Current password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Verify that new password is different from current one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      throw new HttpException(
        'New password must be different from current password',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate hash for new password
    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password in database
    await this.userRepository.update(
      { pkUser },
      { password: hashedNewPassword },
    );

    return { message: 'Password changed successfully' };
  }
}
