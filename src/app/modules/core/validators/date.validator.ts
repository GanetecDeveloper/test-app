import { AbstractControl } from '@angular/forms';
import * as moment_ from 'moment';
import { NgModule } from '@angular/core';

const moment = moment_;

/**
 * Módulo que incluye validacion para fechas.
 */
@NgModule({})
export class DateValidator {

  /**
   * TODO
   * @param AC TODO
   */
  static date(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'DD/MM/YYYY', true).isValid()) {
      return { dateValidator: true };
    }
    return null;
  }

}
