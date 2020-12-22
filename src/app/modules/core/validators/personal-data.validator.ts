import { AbstractControl } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({})
/**
 * TODO
 */
export class PersonalDataValidator {

  /**
   * TODO
   */
  static personalIdentificationNumber(control: AbstractControl) {
    if (!validatePIN(control.value)) {
      return { validUrl: true };
    }
    return null;
  }

}

/**
 * TODO
 * @param value TODO
 */
function validatePIN(value) {
  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  const str = (value || '').toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) {
    return false;
  }

  const nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8), 10) % 23;

  if (validChars.charAt(charIndex) === letter) {
    return true;
  }

  return false;
}
