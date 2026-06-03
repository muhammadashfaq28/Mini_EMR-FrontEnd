import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {
  transform(dateOfBirth: string | Date | null | undefined): string {
    if (!dateOfBirth) {
      return '-';
    }

    const birthDate = new Date(dateOfBirth);

    if (Number.isNaN(birthDate.getTime())) {
      return '-';
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate()
      );

    if (!hasBirthdayPassed) {
      age--;
    }

    return `${age}y`;
  }
}