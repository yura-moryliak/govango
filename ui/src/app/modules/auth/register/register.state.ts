import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { UserCredentialsDataInterface } from './interfaces/user-credentials-data.interface';
import { UserCarInfoDataInterface } from './interfaces/user-car-info-data.interface';
import { RegisterActions } from './register.actions';
import { RegisterStepEnum } from './register.component';
import { delay, of, tap } from 'rxjs';

export interface RegisterStateModel {
  step1: {
    userInfoData: UserInfoDataInterface;
  };
  step2: {
    userCredentialsData: UserCredentialsDataInterface;
    formInvalid: boolean;
  };
  step3?: {
    userCarInfo: UserCarInfoDataInterface;
  };
  activeStep: RegisterStepEnum;
}

export const REGISTER_STATE_TOKEN = new StateToken<RegisterStateModel>(
  'register',
);

const initialRegisterState: RegisterStateModel = {
  step1: {
    userInfoData: {
      isCarOwner: false,
      firstName: '',
      lastName: '',
      city: '',
    },
  },
  step2: {
    userCredentialsData: {
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    formInvalid: false,
  },
  step3: {
    userCarInfo: {
      registrationNumber: '',
      make: '',
      model: '',
      length: 0,
      weight: 0,
      height: 0,
      carryCapacity: 0,
    },
  },
  activeStep: 1,
};

@State<RegisterStateModel>({
  name: REGISTER_STATE_TOKEN,
  defaults: initialRegisterState,
})
@Injectable()
export class RegisterState {
  @Selector()
  static activeStep(state: RegisterStateModel): number {
    return state.activeStep;
  }

  @Selector()
  static userDataInfo(state: RegisterStateModel): UserInfoDataInterface {
    return state.step1.userInfoData;
  }

  @Selector()
  static userCredentialsData(
    state: RegisterStateModel,
  ): UserCredentialsDataInterface {
    return state.step2.userCredentialsData;
  }

  @Selector()
  static userCarInfo(
    state: RegisterStateModel,
  ): UserCarInfoDataInterface | undefined {
    return state.step3?.userCarInfo;
  }

  @Selector()
  static isCarOwner(state: RegisterStateModel): boolean {
    return state.step1.userInfoData.isCarOwner;
  }

  @Selector()
  static isFormInvalid(state: RegisterStateModel): boolean {
    return state.step2.formInvalid;
  }

  @Action(RegisterActions.SetActiveStep)
  setActiveStep(
    { patchState }: StateContext<RegisterStateModel>,
    { activeStep }: RegisterActions.SetActiveStep,
  ): void {
    patchState({ activeStep });
  }

  @Action(RegisterActions.AddUserInfoData)
  addUserInfoData(
    { patchState }: StateContext<RegisterStateModel>,
    { payload }: RegisterActions.AddUserInfoData,
  ): void {
    patchState({ step1: { userInfoData: payload } });
  }

  @Action(RegisterActions.AddUserCredentialsData)
  addUserCredentialsData(
    { patchState }: StateContext<RegisterStateModel>,
    { payload, formInvalid }: RegisterActions.AddUserCredentialsData,
  ): void {
    patchState({
      step2: { userCredentialsData: payload, formInvalid },
    });
  }

  @Action(RegisterActions.RegisterNewUser)
  registerNewUser({ patchState }: StateContext<RegisterStateModel>) {
    // TODO Simulation for BE call
    return of(null).pipe(
      delay(5000),
      tap(() => {
        patchState({ ...initialRegisterState });
      }),
    );
  }
}
