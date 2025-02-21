import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegisterStateModel } from './register.state';

export const registerStepperGuard = (next: ActivatedRouteSnapshot): boolean => {
  const store = inject(Store);
  const router = inject(Router);

  const registerState = store.selectSnapshot<RegisterStateModel>(
    (state) => state.register,
  );

  const stepRoute = next.url[0]?.path as string;
  const stepMapping: Record<string, keyof RegisterStateModel> = {
    'user-info': 'step1',
    'user-credentials-data': 'step2',
    'user-car-info': 'step3',
  };

  const currentStep = stepMapping[stepRoute];

  if (!currentStep) {
    router.navigate(['/register/user-info']);
    return false;
  }

  if (currentStep === 'step2' && !registerState.step1.isCompleted) {
    router.navigate(['/register/user-info']);
    return false;
  }

  if (
    currentStep === 'step3' &&
    (!registerState.step2.isCompleted || registerState.step2.formInvalid)
  ) {
    router.navigate(['/register/user-credentials-data']);
    return false;
  }

  return true;
};
