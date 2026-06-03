import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bmi',
  standalone: true
})
export class BmiPipe implements PipeTransform {
  transform(weightKg: number | null | undefined, heightCm: number | null | undefined): string {
    if (!weightKg || !heightCm || heightCm <= 0) {
      return '-';
    }

    const heightMeter = heightCm / 100;
    const bmi = weightKg / (heightMeter * heightMeter);

    return bmi.toFixed(1);
  }
}