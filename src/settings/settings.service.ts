import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}

  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }

  // Tanımlanmış herhangi bir ayar profili tanımlanmış mı?
  async isHasAnyProfil(): Promise<boolean> {
    try {
      const data: number = await this.settingRepository.count();
      if (data > 0) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
