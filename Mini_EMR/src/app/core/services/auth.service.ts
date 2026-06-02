import { Injectable, signal } from '@angular/core';
import { UserRole } from '../.././shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly roleKey = 'role';
  private readonly userNameKey = 'fullName';

  currentUser = signal<string | null>(null);

  setFullName(name: string): void {
    localStorage.setItem(this.userNameKey, name);
  }

  getFullName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.currentUser.set(token);
  }

  setRole(role: UserRole): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): UserRole | null {
    const role = localStorage.getItem(this.roleKey);

    if (role === 'Doctor' || role === 'Receptionist') {
      return role;
    }

    return null;
  }

  isDoctor(): boolean {
    return this.getRole() === 'Doctor';
  }

  isReceptionist(): boolean {
    return this.getRole() === 'Receptionist';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userNameKey);
    this.currentUser.set(null);
  }
}