import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { CustomDateParserFormatterService } from 'src/app/core/services/custom-date-parser-formatter.service';
import { CustomDatepickerI18nService, I18n } from 'src/app/core/services/custom-datepicker-i18n.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Authority } from 'src/app/model/authority';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user';
import { UserService } from '../../authentication/user.service';

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
  @ViewChild('closeModalButton', {read: ElementRef}) closeModalButton: ElementRef;
  @Input() advanced: boolean;

  private stepper: Stepper;
  registerUserForm: FormGroup;

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    console.log('Inicijalizovana!');
    this.registerUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      role: new FormControl({ value : '', disabled: !this.advanced }, Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[6][0-9]{8}$')])
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

  onSubmit(): void {
    const user = new User();
    user.firstName = this.registerUserForm.controls['firstName'].value;
    user.lastName = this.registerUserForm.controls['lastName'].value;
    user.username = this.registerUserForm.controls['username'].value;
    user.phoneNumber = this.registerUserForm.controls['username'].value;
    user.gender = this.registerUserForm.controls['gender'].value;
    const year = this.registerUserForm.controls['dateOfBirth'].value.year;
    const month = this.registerUserForm.controls['dateOfBirth'].value.month;
    const day = this.registerUserForm.controls['dateOfBirth'].value.day;
    user.dateOfBirth = new Date(year, month - 1, day);
    const authority = new Authority();
    authority.id = +this.registerUserForm.controls['role'].value + 1;
    authority.name = +this.registerUserForm.controls['role'].value;
    user.userAuthorities = [authority];
    this.userService.createUser(user).subscribe({
      next: () => { 
        this.closeModalButton.nativeElement.click();
        this.registerUserForm.reset();
        this.resetStepper();
        this.notificationService.showSuccessMessage('Registracija korisnika', 'Uspešno ste registrovali novog korisnika.');
      },
      error: (status: number) => { 
        this.notificationService.showErrorMessage(status, 'Registracija korisnika', 'Greška prilikom registracije korisnika.')
      }
    });
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

  private resetStepper(): void {
    this.stepper.reset();
  }
}
