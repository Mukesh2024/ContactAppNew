// src/app/validators/email-validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strictEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegexp.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}
