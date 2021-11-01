import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { UserService } from '../../authentication/user.service';
import { ReservationService } from '../reservation.service';
import * as util from '../../../core/util/util';
import * as CustomValidators from './../../../shared/validators/validators';

@Component({
  selector: 'app-manage-reservation-stepper',
  templateUrl: './manage-reservation-stepper.component.html',
  styleUrls: ['./manage-reservation-stepper.component.scss']
})
export class ManageReservationStepperComponent implements OnInit {

  @ViewChild('manageReservationStepper', {read: ElementRef}) manageReservationStepper: ElementRef;
  @ViewChild('closeModalButton', {read: ElementRef}) closeModalButton: ElementRef;

  private stepper: Stepper;
  manageReservationForm: FormGroup;
  employees: User[];
  constructor(private reservationService: ReservationService,
              private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.reservationService.selectedReservation);
    this.getAllEmployees();
    //TODO: Subscribe to the date change
    let initialReservationDate: NgbDateStruct | undefined;
    if (this.reservationService.selectedReservation) {
      initialReservationDate = util.convertDateToNgbDateStruct(this.reservationService.selectedReservation.date);
    } 
    this.manageReservationForm = new FormGroup({
      time: new FormControl({hour: 13, minute: 30}, [Validators.required, CustomValidators.BusinessHoursValidation]),
      date: new FormControl(initialReservationDate, Validators.required),
      typeOfService: new FormControl('', Validators.required),
      worker: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit(): void {
    this.stepper = new Stepper(this.manageReservationStepper.nativeElement, {
      linear: false,
      animation: true
    });
  }

  onSubmit(): void {

  }
  
  next(): void {
    this.stepper.next();
  }

  previous(): void {
    this.stepper.previous();
  }

  getValidityClass(formControlName: string): string {
    return util.getValidityClass(this.manageReservationForm, formControlName);
  }

  getTimeBoxClassName(formControlName: string): string {
    const formControl = this.manageReservationForm.controls[formControlName];
    if (formControl.errors && formControl.dirty) {
      return 'time-box-error';
    } else if (!formControl.errors) {
      return 'time-box-success';
    } else {
      return 'time-box-initial';
    }
  }

  private getAllEmployees(): void {
    this.userService.getUsersByRole(Role.EMPLOYEE).subscribe({
      next: (employees: User[]) => {
        this.employees = employees;
      },
      error: () => {
        //TODO Do I need to handle this?
      }
    });
  }
}
