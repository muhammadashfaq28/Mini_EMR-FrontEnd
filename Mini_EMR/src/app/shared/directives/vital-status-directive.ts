import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  inject
} from '@angular/core';

export type VitalType =
  | 'heightCm'
  | 'weightKg'
  | 'bpSystolic'
  | 'bpDiastolic'
  | 'pulseBpm'
  | 'temperatureC'
  | 'temperatureF'
  | 'respiratoryRate'
  | 'bmi';

@Directive({
  selector: '[appVitalStatus]',
  standalone: true
})
export class VitalStatusDirective implements OnChanges {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @Input() appVitalStatus!: VitalType;
  @Input() vitalValue: string | number | null | undefined = null;

  ngOnChanges(): void {
    this.applyStatus();
  }

  private applyStatus(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.removeClass(element, 'vital-field-normal');
    this.renderer.removeClass(element, 'vital-field-abnormal');

    if (this.vitalValue === null || this.vitalValue === undefined || this.vitalValue === '') {
      return;
    }

    const numericValue = Number(this.vitalValue);

    if (Number.isNaN(numericValue)) {
      return;
    }

    const isNormal = this.isNormalRange(this.appVitalStatus, numericValue);

    if (isNormal) {
      this.renderer.addClass(element, 'vital-field-normal');
    } else {
      this.renderer.addClass(element, 'vital-field-abnormal');
    }
  }

  private isNormalRange(type: VitalType, value: number): boolean {
    switch (type) {
      case 'bpSystolic':
        return value >= 90 && value <= 120;

      case 'bpDiastolic':
        return value >= 60 && value <= 80;

      case 'pulseBpm':
        return value >= 60 && value <= 100;

      case 'temperatureC':
        return value >= 36.1 && value <= 37.2;

      case 'temperatureF':
        return value >= 97 && value <= 99;

      case 'respiratoryRate':
        return value >= 12 && value <= 20;

      case 'bmi':
        return value >= 18.5 && value <= 24.9;

      case 'heightCm':
      case 'weightKg':
        return value > 0;

      default:
        return true;
    }
  }
}