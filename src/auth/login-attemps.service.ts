import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogonHistory } from './entities/logonHistory.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoginAttemptsService {
  constructor(
    @InjectRepository(LogonHistory)
    private readonly loginAttemptRepo: Repository<LogonHistory>,
  ) {}

  async recordAttempt(
    email: string,
    success: boolean,
    ipAddress: string,
    userAgent: string,
    user?: User,
  ) {
    const attempt = this.loginAttemptRepo.create({
      email,
      success,
      ipAddress,
      userAgent,
      user: user || null,
    });

    return this.loginAttemptRepo.save(attempt);
  }

  async getAttemptsByUser(userId: number) {
    return this.loginAttemptRepo.find({
      where: { id: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getFailedAttemptsByIp(ip: string) {
    return this.loginAttemptRepo.find({
      where: { ipAddress: ip, success: false },
      order: { createdAt: 'DESC' },
    });
  }
}
