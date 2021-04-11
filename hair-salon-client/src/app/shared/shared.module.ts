import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [FeedbackModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  exports: [
    CommonModule, 
    ReactiveFormsModule,
    FeedbackModalComponent,
    Ng2TelInputModule
  ]
})
export class SharedModule { }
