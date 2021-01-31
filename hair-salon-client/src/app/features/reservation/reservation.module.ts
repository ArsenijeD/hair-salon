import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReservationComponent],
  imports: [
    SharedModule,
    NgbModule
  ],
  exports: [
    ReservationRoutingModule,
    ReservationComponent
  ]
})
export class ReservationModule { }
