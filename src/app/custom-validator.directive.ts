import { Directive } from '@angular/core';
import {Form, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}
  ]
})
export class CustomValidatorDirective implements Validator {

  constructor() { }

  static nameValidator(control: FormControl): ValidationErrors {
    if (!/^[a-zA-Z ]*$/.test(control.value)) {
      return {
        nameError: true
      };
    }
    return null;
  }

  static lengthValidator(control: FormControl): ValidationErrors {
    if (String(control.value).trim().length <= 4) {
      return {
        lengthError: true
      };
    }
    return null;
  }

  validate(control: FormControl): ValidationErrors | null {
    return CustomValidatorDirective.nameValidator(control);
  }
}
