import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDatepickerI18nService, I18n } from 'src/app/core/services/custom-datepicker-i18n.service';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatterService } from 'src/app/core/services/custom-date-parser-formatter.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [
    I18n, 
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService },     
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService}
  ]
})
export class ReservationComponent implements OnInit {
  reservationFilterForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reservationFilterForm = new FormGroup({
      date: new FormControl('', [Validators.required])
    })
  }

  getReservationAppointments(): Date[] {
    const minHours = 8;
    const maxHours = 20;
    const stepInMinutes = 30;

    const pivotDate = new Date();
    pivotDate.setHours(minHours);
    pivotDate.setMinutes(0);
    const reservationAppointments = [new Date(+pivotDate)];

    while(pivotDate.getHours() < maxHours) {
      pivotDate.setMinutes(pivotDate.getMinutes() + stepInMinutes);
      reservationAppointments.push(new Date(+pivotDate));
    }
    return reservationAppointments;
  }
}
