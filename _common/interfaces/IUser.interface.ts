export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: string;
  phoneNumber?: string;
  birthDate?: Date;
  profilePic?: string;
}
