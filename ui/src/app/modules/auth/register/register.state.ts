import { State, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { UserCredentialsDataInterface } from './interfaces/user-credentials-data.interface';
import { UserCarInfoDataInterface } from './interfaces/user-car-info-data.interface';

export interface RegisterStateModel {
  userInfoData: UserInfoDataInterface;
  userCredentialsData: UserCredentialsDataInterface;
  userCarInfo: UserCarInfoDataInterface;
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
