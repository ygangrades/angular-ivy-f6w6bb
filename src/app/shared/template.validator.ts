import { AbstractControl } from '@angular/forms';

export function ValidateTemplate(control: AbstractControl) {
  if (!(control.value === '') && !control.value.includes('#')) {
    return { invalidUrl: true };
  }
  return null;
}
