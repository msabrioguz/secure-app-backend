import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<User> {
    const user = this.usersRepository.create({
      email,
      password,
      name,
      surname,
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    return user;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersRepository.update(userId, { refreshToken: refreshToken });
  }

  async removeRefreshToken(userId: number) {
    await this.usersRepository.update(userId, {
      refreshToken: '',
    });
  }

  async getUserCount(): Promise<number> {
    return this.usersRepository.count();
  }

  async getProfile(userId: number) {
    if (!userId) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    const {
      id,
      email,
      name,
      surname,
      role,
      phoneNumber,
      birthDate,
      profilePic,
    } = user;
    return {
      id,
      email,
      name,
      surname,
      role,
      phoneNumber,
      birthDate,
      profilePic,
    };
  }

  async updateProfile(userId: number, updateData: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async updateProfilePic(userId: number, profilePicPath: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    user.profilePic = profilePicPath;
    return this.usersRepository.save(user);
  }
}
