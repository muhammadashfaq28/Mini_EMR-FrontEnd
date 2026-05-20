import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-navbar',
  imports: [MatToolbar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  authService = inject(AuthService);
  router = inject(Router);

  fullName = this.authService.getFullName();
  role = this.authService.getRole();

  pageTitle$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => this.getTitle()),
    startWith(this.getTitle())  // ✅ yeh add karo
);

getTitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'Dashboard';
    if (url.includes('patients')) return 'Patients';
    if (url.includes('appointments')) return 'Appointments';
    if (url.includes('visits')) return 'Visit Form';
    return 'MiniEMR';
}

}
