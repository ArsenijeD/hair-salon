import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { CustomDateParserFormatterService } from 'src/app/core/services/custom-date-parser-formatter.service';
import { CustomDatepickerI18nService, I18n } from 'src/app/core/services/custom-datepicker-i18n.service';
import { Role } from 'src/app/model/role';

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

  @ViewChild('registerUserStepper', {read: ElementRef}) registerUserStepper: ElementRef;
  @Input() advanced: boolean;

  private stepper: Stepper;
  registerUserForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.registerUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      role: new FormControl({ value : '', disabled: !this.advanced }, Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[6][0-9]{8}$')])
    });
    console.log(this.registerUserForm);
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

  showUsername(): boolean {
    const selectedRole = this.registerUserForm.controls.role.value;
    return +selectedRole !== Role.CUSTOMER && selectedRole !== "" && this.advanced;
  }

  //TODO: Make this method global by moving it to the util
  getValidityClass(formControlName: string): string {
    const formControl = this.registerUserForm.controls[formControlName];
    if (formControl.errors && formControl.dirty) {
      return `is-invalid`;
    } else if (!formControl.errors && formControl.dirty) {
      return `is-valid`;
    } else {
      return ``;
    }
  }

  //TODO: Make this method global by moving it to the util
  getFormControlErrorMessage(formControlName: string): string {
    const formControl = this.registerUserForm.controls[formControlName];
    if (formControl.errors.required) {
      return `Morate popuniti ovo polje!`;
    } else if (formControl.errors.maxlength) {
      return `Maksimalna dužina ovog polja je ${formControl.errors.maxlength.requiredLength} karaktera!`;
    } else {
      return ``;
    }
  }
}
