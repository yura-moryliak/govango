import {
  CarMakeType,
  CarsListInterface,
} from '../../../../shared/services/static-assets.service';

export interface UserCarInfoDataInterface {
  registrationPlate: string;
  make: CarsListInterface | null;
  model: CarMakeType;
  length: number;
  width: number;
  height: number;
  carryCapacity: number;
}
