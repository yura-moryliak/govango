import { Injectable } from '@angular/core';

import { Message } from 'primeng/message';

import { BehaviorSubject, Observable } from 'rxjs';
import { ToastTypesEnum } from '../enums/toast-types.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageConfig: Message | undefined;

  private toastSubject: BehaviorSubject<Message | undefined> =
    new BehaviorSubject<Message | undefined>(undefined);

  toast$: Observable<Message | undefined> = this.toastSubject.asObservable();

  showSuccessToast(summary: string, detail: string): void {
    // this.toastSubject.next({ ...this.messageConfig, severity: 'success', summary, detail, key: ToastTypesEnum.Success });
    this.toastSubject.next({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  showErrorToast(summary: string, detail: string): void {
    this.toastSubject.next({
      ...this.messageConfig,
      severity: 'error',
      summary,
      detail,
      key: ToastTypesEnum.Error,
    });
  }

  showInfoToast(summary: string, detail: string): void {
    this.toastSubject.next({
      ...this.messageConfig,
      severity: 'info',
      summary,
      detail,
      key: ToastTypesEnum.Info,
    });
  }

  showWarnToast(summary: string, detail: string): void {
    this.toastSubject.next({
      ...this.messageConfig,
      severity: 'warn',
      summary,
      detail,
      key: ToastTypesEnum.Warn,
    });
  }
}
