import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent {
  private readonly authService = inject(AuthService);

  fullName = this.authService.getFullName();
  role = this.authService.getRole();

  version = '1.0.0';
}