import { NgModule } from '@angular/core';
import { ReservationComponent } from './reservation.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserStepperComponent } from './register-user-stepper/register-user-stepper.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationComponent
  },
  {
    path: 'register-user',
    component: RegisterUserStepperComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReservationRoutingModule { }
