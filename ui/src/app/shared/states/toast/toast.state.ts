import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ToastActions } from './toast.actions';
import { ToastMessageOptions } from 'primeng/api';

export interface ToastStateModelInterface {
  toast: ToastMessageOptions;
}

export const TOAST_STATE_TOKEN = new StateToken<ToastStateModelInterface>(
  'toast',
);

@State({
  name: TOAST_STATE_TOKEN,
  defaults: {
    toast: {},
  },
})
@Injectable()
export class ToastState {
  @Selector()
  static toast(state: ToastStateModelInterface): ToastMessageOptions {
    return state.toast;
  }

  @Action(ToastActions.ShowToast)
  showToast(
    { patchState }: StateContext<ToastStateModelInterface>,
    { message }: ToastActions.ShowToast,
  ): void {
    patchState({ toast: message });
  }
}
