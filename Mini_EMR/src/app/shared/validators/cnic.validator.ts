import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cnicValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | null;

    if (!value) {
      return null;
    }

    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    return cnicRegex.test(value)
      ? null
      : { invalidCnic: true };
  };
}