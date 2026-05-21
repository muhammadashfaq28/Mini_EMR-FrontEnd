import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { BookAppointmentDialog } from '../../features/appointments/dialogs/book-appointment-dialog/book-appointment-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  openBookAppointment(): void {
    const dialogRef =
      this.dialog.open(
        BookAppointmentDialog,
        {
          width: '95%',
          maxWidth: '800px',
          disableClose: true
        });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          window.location.reload();
        }
      });
  }
}