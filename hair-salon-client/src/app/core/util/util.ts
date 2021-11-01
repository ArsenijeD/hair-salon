import { FormGroup } from '@angular/forms';
import {NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export const convertNgbDateStructToDate = (ngbDateStruct: NgbDateStruct): Date => {
  const date = new Date(ngbDateStruct.year, ngbDateStruct.month - 1, ngbDateStruct.day);
  date.setHours(2, 0, 0, 0);  //TODO: 2 hours is difference between js Date object and ISO format (find better way)
  return date;
}

export const convertDateToNgbDateStruct = (date: Date): NgbDateStruct => {
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
}

//TODO: Remove this?
export const getValidityClass = (formGroup: FormGroup, formControlName: string): string => {
  const formControl = formGroup.controls[formControlName];
  if (formControl.errors && formControl.dirty) {
    return `is-invalid`;
  } else if (!formControl.errors) {
    return `is-valid`;
  } else {
    return ``;
  }
}