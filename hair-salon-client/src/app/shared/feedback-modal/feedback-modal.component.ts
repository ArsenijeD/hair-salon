import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackModalService } from 'src/app/core/services/feedback-modal.service';
import { ModalConfig } from 'src/app/core/util/interfaces';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit, OnDestroy {

  @ViewChild('template', {read: TemplateRef}) template: TemplateRef<any>;

  modalConfig: ModalConfig;
  modalConfigSubscription: Subscription;

  constructor(private feedbackModalService: FeedbackModalService) {}

  ngOnInit(): void {
    this.modalConfigSubscription = this.feedbackModalService.getModalConfig().subscribe((modalConfig: ModalConfig) => { 
      this.modalConfig = modalConfig;
      this.feedbackModalService.showModal(this.template);
    })
  }

  ngOnDestroy(): void {
    this.modalConfigSubscription.unsubscribe();
  }

  hideModal(): void {
    this.feedbackModalService.modalInstance.hide();
  }

  onConfirmClicked(): void {
    this.hideModal();
    this.modalConfig.confirmButtonAction();
  }
}
