import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDatepickerI18nService, I18n } from 'src/app/core/services/custom-datepicker-i18n.service';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatterService } from 'src/app/core/services/custom-date-parser-formatter.service';
import { FeedbackModalService } from 'src/app/core/services/feedback-modal.service';
import { ReservationService } from './reservation.service';
import { UserService } from '../authentication/user.service';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import * as util from './../../core/util/util';
import { Reservation } from 'src/app/model/reservation';
import { ApplicationStorageManagementService } from 'src/app/core/services/session-management.service';

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
  employees: User[] = [];
  dailyReservations: Reservation[] = [];

  constructor(private feedbackModalService: FeedbackModalService,
              private reservationService: ReservationService,
              private userService: UserService,
              private session: ApplicationStorageManagementService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const initialDate = util.convertDateToNgbDateStruct(currentDate);
    //TODO: In dropdown in HTML, set default worker (currently logged in or any other?)
    this.reservationFilterForm = new FormGroup({
      date: new FormControl(initialDate, [Validators.required]),
      workerId: new FormControl('', [Validators.required])
    });

    this.getAllEmployees();
    this.reservationFilterForm.valueChanges.subscribe((filterValues: {[key: string]: any}) => {
      const date = util.convertNgbDateStructToDate(filterValues.date);
      this.getWorkersDailyReservations(filterValues.workerId, date);
    })
  }

  getReservationAppointments(): Date[] {
    const minHours = 8;
    const maxHours = 20;
    const stepInMinutes = 30;

    const pivotDate = util.convertNgbDateStructToDate(this.reservationFilterForm.controls.date.value);
    pivotDate.setHours(minHours);
    pivotDate.setMinutes(0);
    const reservationAppointments = [new Date(+pivotDate)];

    while(pivotDate.getHours() < maxHours) {
      pivotDate.setMinutes(pivotDate.getMinutes() + stepInMinutes);
      reservationAppointments.push(new Date(+pivotDate));
    }
    return reservationAppointments;
  }

  updateSelectedReservation(appointment?: Date): void {
    //TODO: Make appropriate constructor
    const worker = this.employees.find((employee: User) => {
      return this.reservationFilterForm.controls.workerId.value === employee.id;
    });
    if (appointment) {
      this.reservationService.selectedReservation = new Reservation(appointment, worker);
    } else {
      this.reservationService.selectedReservation = new Reservation(this.reservationFilterForm.controls.date.value, worker);
    }
    
  }

  onButtonClick(): void {
    this.feedbackModalService.openModal(
      { title: 'Otkazivanje rezervacije', 
        message: 'Da li ste sigurni da zelite da otkazete ovu rezervaciju?',
        confirmButtonVisible: true,
        cancelButtonVisible: true,
        confirmButtonAction: () => {console.log('Kliknuto!')}
      }
    );
  }

  private getWorkersDailyReservations(workerId: number, date: Date): void {
    this.reservationService.getWorkersDailyReservations(workerId, date).subscribe({
      next: (reservations: Reservation[]) => {
        this.dailyReservations = reservations;
      },
      error: () => {
        //TODO Do I need to handle this?
      }
    });
  }

  private getAllEmployees(): void {
    this.userService.getUsersByRole(Role.EMPLOYEE).subscribe({
      next: (employees: User[]) => {
        this.employees = employees;
        const currentUser = this.session.get('current-user') as User;
        if (this.userService.hasAuthority(currentUser, Role.ADMIN)) {
          this.reservationFilterForm.controls['workerId'].setValue(employees[0].id);
        } else {
          this.reservationFilterForm.controls['workerId'].setValue(currentUser.id);
        }
      },
      error: () => {
        //TODO Do I need to handle this?
      }
    });
  }
}
