import { NgModule } from '@angular/core';
import { DateValidator } from './date.validator';
import { PersonalDataValidator } from './personal-data.validator';
import { AutoCompleteValidator } from './autocomplete.validator';

/**
 * TODO
 */
@NgModule({
    exports: [
        AutoCompleteValidator,
        DateValidator,
        PersonalDataValidator
    ]
})
export class ValidatorsModule { }
