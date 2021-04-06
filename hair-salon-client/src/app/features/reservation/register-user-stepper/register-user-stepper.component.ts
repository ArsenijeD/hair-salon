import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-register-user-stepper',
  templateUrl: './register-user-stepper.component.html',
  styleUrls: ['./register-user-stepper.component.scss']
})
export class RegisterUserStepperComponent implements OnInit, AfterViewInit {

  private stepper: Stepper;
  myForm: FormGroup;

  @ViewChild('stepper1', {read: ElementRef}) stepper1: ElementRef;

  constructor() { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
    
  }

  ngAfterViewInit(): void {
    this.stepper = new Stepper(this.stepper1.nativeElement, {
      linear: false,
      animation: true
    });
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }
}
