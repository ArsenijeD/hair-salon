import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CustomDateParserFormatterService extends NgbDateParserFormatter{
  readonly DELIMITER = '.';

  constructor() {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }
  
  format(dateStruct: NgbDateStruct): string {
    const date = new Date(dateStruct?.year, dateStruct?.month - 1, dateStruct?.day);
    return dateStruct ? dateStruct.day + this.DELIMITER + dateStruct.month + 
      this.DELIMITER + dateStruct.year + ', ' + date.toLocaleString('sr-latn', { weekday: 'long'}) : '';
  }
}
