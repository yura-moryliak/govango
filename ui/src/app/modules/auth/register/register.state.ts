import { State, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';

interface UserInfoDataInterface {
  isCarOwner: boolean;
  firstName: string;
  lastName: string;
  city: string;
}

interface UserCredentialsDataInterface {
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserCarInfoInterface {
  registrationNumber: string;
  make: string;
  model: string;
  length: number;
  weight: number;
  height: number;
  carryCapacity: number;
}

export interface RegisterStateModel {
  userInfoData: UserInfoDataInterface;
  userCredentialsData: UserCredentialsDataInterface;
  userCarInfo: UserCarInfoInterface;
}

export const REGISTER_STATE_TOKEN = new StateToken<RegisterStateModel>(
  'register',
);

@State<RegisterStateModel>({
  name: REGISTER_STATE_TOKEN,
  defaults: {
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
  },
})
@Injectable()
export class RegisterState {}
