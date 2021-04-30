import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-make-reservation-stepper',
  templateUrl: './make-reservation-stepper.component.html',
  styleUrls: ['./make-reservation-stepper.component.scss']
})
export class MakeReservationStepperComponent implements OnInit {

  @ViewChild('makeReservationStepper', {read: ElementRef}) makeReservationStepper: ElementRef;
  @ViewChild('closeModalButton', {read: ElementRef}) closeModalButton: ElementRef;

  private stepper: Stepper;
  makeReservationForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.makeReservationForm = new FormGroup({});
  }

  ngAfterViewInit(): void {
    this.stepper = new Stepper(this.makeReservationStepper.nativeElement, {
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
}
