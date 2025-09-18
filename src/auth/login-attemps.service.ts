import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogonHistory } from './entities/logonHistory.entity';
import { MoreThan, Repository } from 'typeorm';
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

  async countFailedAttempts(email: string, minutes: number): Promise<number> {
    const since = new Date(Date.now() - minutes * 60 * 1000);
    const attempt = await this.loginAttemptRepo.count({
      where: { email: email, success: false, createdAt: MoreThan(since) },
    });
    console.log(attempt);
    return attempt;
  }

  async getUserAttempts(userId: number) {
    return this.loginAttemptRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllAttempts() {
    return this.loginAttemptRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
