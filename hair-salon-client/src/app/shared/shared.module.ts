import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';

@NgModule({
  declarations: [FeedbackModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule, 
    ReactiveFormsModule,
    FeedbackModalComponent,
  ]
})
export class SharedModule { }
