import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { UserCredentialsDataInterface } from './interfaces/user-credentials-data.interface';
import { UserCarInfoDataInterface } from './interfaces/user-car-info-data.interface';
import { RegisterActions } from './register.actions';
import { RegisterStepEnum } from './register.component';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { RegisterUserInterface } from './interfaces/register-user.interface';

export interface RegisterStateModel {
  step1: {
    userInfoData: UserInfoDataInterface;
    isCompleted?: boolean;
  };
  step2: {
    userCredentialsData: UserCredentialsDataInterface;
    formInvalid: boolean;
    isCompleted?: boolean;
    isPreviousCompleted?: boolean;
  };
  step3: {
    userCarInfo: UserCarInfoDataInterface;
    formInvalid: boolean;
    isCompleted?: boolean;
    isPreviousCompleted?: boolean;
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
      registrationPlate: '',
      make: { id: null, make: '', models: [] },
      model: { makeId: '', name: '' },
      length: 0,
      width: 0,
      height: 0,
      carryCapacity: 0,
    },
    formInvalid: false,
  },
  activeStep: 1,
};

@State<RegisterStateModel>({
  name: REGISTER_STATE_TOKEN,
  defaults: initialRegisterState,
})
@Injectable()
export class RegisterState {
  private readonly authService: AuthService = inject(AuthService);

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
  static userCarInfo(state: RegisterStateModel): UserCarInfoDataInterface {
    return state.step3.userCarInfo;
  }

  @Selector()
  static isCarOwner(state: RegisterStateModel): boolean {
    return state.step1.userInfoData.isCarOwner;
  }

  @Selector()
  static isStep2FormInvalid(state: RegisterStateModel): boolean {
    return state.step2.formInvalid;
  }

  @Selector()
  static isStep3FormInvalid(state: RegisterStateModel): boolean {
    return state?.step3.formInvalid;
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

  @Action(RegisterActions.AddUserCarInfoData)
  addUserCarInfoData(
    { patchState }: StateContext<RegisterStateModel>,
    { payload, formInvalid }: RegisterActions.AddUserCarInfoData,
  ): void {
    patchState({
      step3: { userCarInfo: payload, formInvalid },
    });
  }

  @Action(RegisterActions.CompleteStep1)
  completeStep1({
    patchState,
    getState,
  }: StateContext<RegisterStateModel>): void {
    patchState({
      step1: { ...getState().step1, isCompleted: true },
      step2: { ...getState().step2, isPreviousCompleted: true },
    });
  }

  @Action(RegisterActions.CompleteStep2)
  completeStep2({
    patchState,
    getState,
  }: StateContext<RegisterStateModel>): void {
    if (!getState().step2.formInvalid) {
      patchState({
        step2: { ...getState().step2, isCompleted: true },
        step3: { ...getState().step3, isPreviousCompleted: true },
      });
    }
  }

  @Action(RegisterActions.CompleteStep3)
  completeStep3({
    patchState,
    getState,
  }: StateContext<RegisterStateModel>): void {
    patchState({
      step3: { ...getState().step3, isCompleted: true },
    });
  }

  @Action(RegisterActions.RegisterNewUser, { cancelUncompleted: true })
  registerNewUser({
    patchState,
    getState,
  }: StateContext<RegisterStateModel>): Observable<null> {
    const { confirmPassword, ...rest } = getState().step2.userCredentialsData;

    const registerUserData: RegisterUserInterface = {
      userInfo: getState().step1.userInfoData,
      userCredentials: rest,
      userCarInfo: {
        ...getState().step3.userCarInfo,
        make: getState().step3.userCarInfo.make.make,
        model: getState().step3.userCarInfo.model.name,
      },
    };

    return this.authService
      .registerUser(registerUserData)
      .pipe(tap(() => patchState({ ...initialRegisterState })));
  }
}
