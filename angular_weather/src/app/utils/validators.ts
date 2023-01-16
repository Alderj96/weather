import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')!.value
    const confirmPassword = control.get('confirmpassword')!.value
    if (!password || !confirmPassword) return null
    if (password === confirmPassword) {
      return null
    }

    return { match_password: true }
  }

}

export class MyValidatorRegex {
  static fullName = /^([\w]{3,})+\s+([\w\s]{3,})+\s+([\w\s]{3,})+$/i
  static password = /^[0-9a-zA-Z]{8,}$/
}
