export interface UserModel {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  specialization?: string | null;
  isActive?: boolean;
}

export type UserRole = 'Doctor' | 'Receptionist';