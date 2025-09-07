import { Role } from '_base/enum/role.enum';

export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: Role;
  phoneNumber?: string;
  birthDate?: Date;
  profilePic?: string;
}
