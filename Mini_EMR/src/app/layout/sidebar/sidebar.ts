import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, MatListModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  authService = inject(AuthService);
  router = inject(Router);

  fullName = this.authService.getFullName();
  role = this.authService.getRole();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
