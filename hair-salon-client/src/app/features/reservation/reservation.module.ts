import { NgModule } from '@angular/core';
import { ReservationComponent } from './reservation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserStepperComponent } from './register-user-stepper/register-user-stepper.component';
import { MakeReservationStepperComponent } from './make-reservation-stepper/make-reservation-stepper.component';

@NgModule({
  declarations: [
    ReservationComponent, 
    RegisterUserStepperComponent, 
    MakeReservationStepperComponent
  ],
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
