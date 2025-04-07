import { Car } from './cars.interface';

const ACTION_SCOPE = ['Cars'];

export namespace CarsActions {
  export class AddCar {
    static readonly type = `${ACTION_SCOPE} AddCar`;
    constructor(
      public userId: string,
      public car: Car,
    ) {}
  }
}
