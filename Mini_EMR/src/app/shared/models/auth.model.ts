import { UserRole } from './user.model';

export interface LoginRequestModel {
  username: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
  userId: number;
  username: string;
  fullName: string;
  role: UserRole;
  specialization?: string | null;
}