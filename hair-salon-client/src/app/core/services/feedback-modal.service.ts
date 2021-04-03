import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from '@bit/valor-software.ngx-bootstrap.modal';
import { Observable, Subject } from 'rxjs';
import { ModalConfig } from '../util/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeedbackModalService {

  private _modalRef: BsModalRef;
  private _modalConfigSubject: Subject<ModalConfig>;

  get modalInstance(): BsModalRef {
    return this._modalRef;
  }

  set modalInstance(modalRef: BsModalRef) {
    this._modalRef = modalRef;
  }

  constructor(private modalService: BsModalService) {
    this._modalConfigSubject = new Subject<ModalConfig>();
  }

  getModalConfig(): Observable<ModalConfig> {
    return this._modalConfigSubject.asObservable();
  }

  //TODO: Consider method naming
  openModal(modalConfig: ModalConfig) {
    this._modalConfigSubject.next(modalConfig);
  }

  showModal(modalTemplateRef: TemplateRef<any>): void {
    this._modalRef = this.modalService.show(modalTemplateRef);
  }
}
