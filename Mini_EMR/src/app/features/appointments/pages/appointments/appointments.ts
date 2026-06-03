import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BookAppointmentDialog } from '../../dialogs/book-appointment-dialog/book-appointment-dialog';

@Component({
  selector: 'app-appointments',
  standalone: true,
  template: ''
})
export class Appointments implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const dialogRef = this.dialog.open(
      BookAppointmentDialog,
      {
        width: '850px',
        maxWidth: '90vw',
        disableClose: true,
        
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}