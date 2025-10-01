import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRegisterStatus } from '_base/enum/userRegisterStatus.enum';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const hasAny = await this.isHasAnyProfil();
    if (!hasAny) {
      await this.initialization();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createSettingDto: CreateSettingDto) {
    return 'This action adds a new setting';
  }

  findAll() {
    return `This action returns all settings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSettingDto: UpdateSettingDto) {
    return `This action updates a #${id} setting`;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }

  async initialization() {
    try {
      const data = {
        name: 'Varsayılan Ayarlar',
        title: this.configService.get<string>('app_name') || 'MSOApp',
        appPort: this.configService.get<number>('app_port') || 3000,
        maintenance:
          this.configService.get<boolean>('app_maintenance') || false,
        registerValidation:
          this.configService.get<UserRegisterStatus>(
            'app_register_validation',
          ) || UserRegisterStatus.ACTIVE,
        emailService: this.configService.get<string>('email_service') || 'SMTP',
        emailHost: this.configService.get<string>('email_host') || 'localhost',
        emailPort: this.configService.get<number>('email_port') || 1234,
        emailUser: this.configService.get<string>('email_user') || 'username',
        emailPass: this.configService.get<string>('email_pass') || 'test',
      };
      await this.settingRepository.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Tanımlanmış herhangi bir ayar profili var mı?
  isHasAnyProfil(): Promise<boolean> {
    return this.settingRepository
      .count()
      .then((count) => {
        if (count > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
