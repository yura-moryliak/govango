export interface ToastConfig {
  key: string;
  breakpoint: { [key: string]: { width: string } };
}
export const TOASTS_CONFIG: ToastConfig[] = [
  {
    key: 'success',
    breakpoint: { '560px': { width: '90%' } },
  },
  {
    key: 'info',
    breakpoint: { '560px': { width: '90%' } },
  },
  {
    key: 'warning',
    breakpoint: { '560px': { width: '90%' } },
  },
  {
    key: 'error',
    breakpoint: { '560px': { width: '90%' } },
  },
  {
    key: 'secondary',
    breakpoint: { '560px': { width: '90%' } },
  },
  {
    key: 'contrast',
    breakpoint: { '560px': { width: '90%' } },
  },
];
