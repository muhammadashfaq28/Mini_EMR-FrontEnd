import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'token';
  private roleKey = 'role';
  private userNameKey = 'fullName';

  setFullName(name: string): void {
    localStorage.setItem(this.userNameKey, name);
  }

  getFullName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  currentUser = signal<string | null>(null);

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.currentUser.set(token);
  }
  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
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
