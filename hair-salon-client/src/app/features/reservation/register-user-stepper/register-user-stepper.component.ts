import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
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
  myForm: FormGroup;

  
  @ViewChild('stepper1', {read: ElementRef}) stepper1: ElementRef;

  constructor() {}

  ngOnInit(): void {
    //TODO: Try to install @types/intl-tel-input for geting intlInput... method

    this.myForm = new FormGroup({
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
    
    this.stepper = new Stepper(this.stepper1.nativeElement, {
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
}
