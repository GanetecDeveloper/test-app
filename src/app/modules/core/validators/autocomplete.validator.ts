import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({})
/**
 * TODO
 */
export class AutoCompleteValidator {

    /**
     * TODO
     * @param optionList TODO
     */
    static optionValid(optionList: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            let valid;
            optionList.forEach(option => {
                if (option === value) {
                    valid = true;
                }
            });
            if (valid) {
                return null;
            }
            return { validOption: true };
        };
    }
}
