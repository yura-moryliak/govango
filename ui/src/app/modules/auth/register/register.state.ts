import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { UserCredentialsDataInterface } from './interfaces/user-credentials-data.interface';
import { UserCarInfoDataInterface } from './interfaces/user-car-info-data.interface';
import { RegisterActions } from './register.actions';
import { RegisterStepEnum } from './register.component';

export interface RegisterStateModel {
  userInfoData: UserInfoDataInterface;
  userCredentialsData: UserCredentialsDataInterface;
  userCarInfo: UserCarInfoDataInterface;
  activeStep: RegisterStepEnum;
  isRegistrationCompleted: boolean;
}

export const REGISTER_STATE_TOKEN = new StateToken<RegisterStateModel>(
  'register',
);

const initialRegisterState: RegisterStateModel = {
  userInfoData: {
    isCarOwner: false,
    firstName: '',
    lastName: '',
    city: '',
  },
  userCredentialsData: {
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  userCarInfo: {
    registrationNumber: '',
    make: '',
    model: '',
    length: 0,
    weight: 0,
    height: 0,
    carryCapacity: 0,
  },
  activeStep: 1,
  isRegistrationCompleted: false,
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
    return state.userInfoData;
  }

  @Selector()
  static userCredentialsData(
    state: RegisterStateModel,
  ): UserCredentialsDataInterface {
    return state.userCredentialsData;
  }

  @Selector()
  static userCarInfo(state: RegisterStateModel): UserCarInfoDataInterface {
    return state.userCarInfo;
  }

  @Selector()
  static isCarOwner(state: RegisterStateModel): boolean {
    return state.userInfoData.isCarOwner;
  }

  @Selector()
  static isRegistrationCompleted(state: RegisterStateModel): boolean {
    return state.isRegistrationCompleted;
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
    patchState({ userInfoData: payload });
  }
}
