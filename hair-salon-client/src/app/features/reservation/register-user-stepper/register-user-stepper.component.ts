import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { CustomDateParserFormatterService } from 'src/app/core/services/custom-date-parser-formatter.service';
import { CustomDatepickerI18nService, I18n } from 'src/app/core/services/custom-datepicker-i18n.service';

@Component({
  selector: 'app-register-user-stepper',
  templateUrl: './register-user-stepper.component.html',
  styleUrls: ['./register-user-stepper.component.scss'],
  providers: [
    I18n, 
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService },     
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService}
  ]
})
export class RegisterUserStepperComponent implements OnInit, AfterViewInit {

  private stepper: Stepper;
  registerUserForm: FormGroup;

  @ViewChild('registerUserStepper', {read: ElementRef}) registerUserStepper: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.registerUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit(): void {
    
    this.stepper = new Stepper(this.registerUserStepper.nativeElement, {
      linear: false,
      animation: true
    });
  }

  next(): void {
    this.stepper.next();
  }

  previous(): void {
    this.stepper.previous();
  }

  onSubmit(): boolean {
    return false;
  }

  getBirthMinDate(): NgbDateStruct {
    return {year: 1900, month: 1, day: 1};
  }

  getBirthMaxDate(): NgbDateStruct {
    const currentDate = new Date();
    return {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()};
  }
}
