import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';


@NgModule({
  declarations: [ReservationComponent],
  imports: [
    SharedModule
  ],
  exports: [
    ReservationRoutingModule,
    ReservationComponent
  ]
})
export class ReservationModule { }
