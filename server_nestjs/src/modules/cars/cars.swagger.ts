import { CarEntity } from './car.entity';

const carEntity = new CarEntity();
carEntity.id = '1';
carEntity.make = 'Opel';
carEntity.model = 'Vivaro';
carEntity.length = 5.5;
carEntity.width = 2.7;
carEntity.height = 2.5;
carEntity.carryCapacity = 3.5;

export const ADDED_CAR_OK_RESPONSE_EXAMPLE: CarEntity = carEntity;
export const ALL_CARS_OK_RESPONSE_EXAMPLE: CarEntity[] = [carEntity];
