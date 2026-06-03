import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    const phoneRegex = /^03\d{9}$/;

    return phoneRegex.test(value)
      ? null
      : { invalidPhoneNumber: true };
  };
}