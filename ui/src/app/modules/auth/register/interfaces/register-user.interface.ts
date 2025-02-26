import { UserInfoDataInterface } from './user-info-data.interface';
import { UserCredentialsDataInterface } from './user-credentials-data.interface';

type UnifiedCarInfoType = {
  registrationPlate: string;
  make: string;
  model: string;
  length: number;
  width: number;
  height: number;
  carryCapacity: number;
};

export interface RegisterUserInterface {
  userInfo: UserInfoDataInterface;
  userCredentials: Omit<UserCredentialsDataInterface, 'confirmPassword'>;
  userCarInfo: UnifiedCarInfoType;
}
