import { Injectable, Inject } from '@angular/core';
import { HttpRequestService } from '../http/http-request.service';
import { AbstractControl } from '@angular/forms';
import { HttpService } from '../http/http-service.service';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ValidationFormService {
  static THIS;

  constructor(@Inject(HttpRequestService) private http) {
    ValidationFormService.THIS = this;
  }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    const config = {
      'required': 'Required',

      'doesnotMatchPassword': 'Password does not match.',

      'invalidEmailAddress': 'Email is invalid.',
      'unavailableEmailAdress': 'Email has already been taken.',

      'minlength': `Minimum length ${validatorValue.requiredLength}`,

      'invalidNumber': 'Must be number',
      'invalidPhonenumber': 'Phone number is invalid',
      'atLeast8Character': 'Password must be a minimum of 8 characters'
    };
    return config[validatorName];
  }

  async phoneNumberValidator(AC: AbstractControl) {
    //   const response = await this.http.phoneNumberValidator(AC.value).toPromise();
    //   if (response && response.valid == true) {
    //     return null;
    //   }
    //   else {
    //     return { 'invalidPhonenumber': true };
    //   }
    return null;
  }

  passwordAtLeast8CharacterValidator(AC: AbstractControl) {
    if (!AC.parent || !AC) {
      return null;
    }
    const pwd = AC.parent.get('password')



    if (!pwd) {
      return null;
    }

    if (typeof pwd.value != 'undefined' && pwd.value.length < 8) {
      return { 'atLeast8Character': true };
    }

  }

  passwordValidator(AC: AbstractControl) {

    if (!AC.parent || !AC) {
      return null;
    }
    const pwd = AC.parent.get('password'),
      cpwd = AC.parent.get('confirmPassword');



    if (!pwd || !cpwd) {
      return null;
    }

    if (typeof pwd.value != 'undefined' && pwd.value.length < 8) {
      return { 'atLeast8Character': true };
    }

    if (pwd.value.length > 7 && cpwd.value.length > 7) {
      if (pwd.value === cpwd.value) {
        cpwd.setErrors(null);
      } else {
        cpwd.setErrors({ 'doesnotMatchPassword': true });
      }
    }
  }

  confirmPasswordValidator(AC: AbstractControl) {
    if (!AC.parent || !AC) {
      return null;
    }
    const pwd = AC.parent.get('password'),
      cpwd = AC.parent.get('confirmPassword');

    if (!pwd || !cpwd) {
      return null;
    }
    if (typeof cpwd.value != 'undefined' && cpwd.value.length < 8) {
      return { 'atLeast8Character': true };
    }

    if (pwd.value.length > 7 && cpwd.value.length > 7) {

      if (pwd.value !== cpwd.value) {
        return { 'doesnotMatchPassword': true };
      }
    }
  }

  emailValidator(AC: AbstractControl) {
    if (!AC.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return { 'invalidEmailAddress': true };
    }
  }

  numberValidator(AC: AbstractControl) {
    if (!AC.value.match(/^\d+$/)) {
      return { 'invalidNumber': true };
    }
  }




  //
  loginPasswordValidator(AC: AbstractControl) {
    if (!AC.parent || !AC) {
      return null;
    }
    const pwd = AC.parent.get('password'),
      cpwd = AC.parent.get('confirmPassword');



    if (!pwd || !cpwd) {
      return null;
    }

    if (pwd.value === cpwd.value) {
      cpwd.setErrors(null);
    } else {
      cpwd.setErrors({ 'doesnotMatchPassword': true });
    }



  }

  loginConfirmPasswordValidator(AC: AbstractControl) {
    if (!AC.parent || !AC) {
      return null;
    }
    const pwd = AC.parent.get('password'),
      cpwd = AC.parent.get('confirmPassword');

    if (!pwd || !cpwd) {
      return null;
    }



    if (pwd.value !== cpwd.value) {
      return { 'doesnotMatchPassword': true };
    }

  }
}
