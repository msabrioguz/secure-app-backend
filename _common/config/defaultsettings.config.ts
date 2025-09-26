import { registerAs } from '@nestjs/config';
import { Setting } from 'src/settings/entities/setting.entity';

export default registerAs('setting', () => ({
  appName: process.env.APP_NAME || 'MSOApp',
  appPort: process.env.APP_PORT || 3000,
  maintenance: process.env.APP_MAINTENANCE || false,
  emailService: process.env.EMAIL_SERVICE,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  entities: [Setting],
  synchronize: true,
}));
