import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

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
