import { ToastMessageOptions } from 'primeng/api';

const ACTION_SCOPE = '[Toast]';

export const INITIAL_TOAST_OPTIONS: ToastMessageOptions = {
  life: 5000,
  closable: true,
};

export namespace ToastActions {
  export class ShowToast {
    static readonly type = `${ACTION_SCOPE} Show Toast`;
    constructor(public message: ToastMessageOptions) {}
  }
}
