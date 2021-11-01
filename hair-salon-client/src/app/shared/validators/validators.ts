import { AbstractControl, ValidationErrors } from "@angular/forms";

export const BusinessHoursValidation = (control: AbstractControl): ValidationErrors | null => {
    if (control.value.hour < 8 || (control.value.hour >= 20 && control.value.minute > 0) || control.value.hour > 20) {
        return { 'invalidTime': true };
    }
    return null;
}