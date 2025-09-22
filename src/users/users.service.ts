import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { IUser } from '_common/interfaces/IUser.interface';
import * as fs from 'fs';
import * as path from 'path';
import { UserResponseDto } from './dto/user-response.dto';

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
      refreshToken: '',
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

  async getProfile(userId: number): Promise<IUser> {
    if (!userId) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    const userData: IUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      profilePic: user.profilePic,
      role: user.role,
      phoneNumber: user.phoneNumber,
      birthDate: user.birthDate,
    };
    return userData;
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
    // Eski avatar varsa sil
    if (user.profilePic) {
      const filePath = path.join(__dirname, '..', '..', '..', user.profilePic);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // dosyayı sil
      }
    }
    user.profilePic = profilePicPath;
    return this.usersRepository.save(user);
  }

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // Kullanıcıların Listelenmesi
  // TODO: Arama kriterinde en az 3 karakter varsa çalışması gerekiyor.
  async getAllUsers(
    page = 1,
    limit = 10,
    search = '',
  ): Promise<{ data: UserResponseDto[]; total: number }> {
    const [users, total] = await this.usersRepository.findAndCount({
      where: search
        ? [
            { name: Like(`%${search}%`) },
            { surname: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
          ]
        : {},
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return {
      data: users.map((u) => ({
        id: u.id,
        name: u.name,
        surname: u.surname,
        email: u.email,
        role: u.role,
        profilePic: u.profilePic,
        createdAt: u.createdAt,
      })),
      total,
    };
  }

  // Son Kayıt Olan 10 Kullanıcı
  async getLastRegisterUsers() {
    const data = await this.usersRepository.find({
      take: 10,
      order: { id: 'DESC' },
    });

    return data.map((user) => ({
      id: user.id,
      profilePic: user.profilePic,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }
}
