export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  fullName: string;
}

export interface Doctor {
  id: number;
  fullName: string;
}