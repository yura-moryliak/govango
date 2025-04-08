import { Car } from './cars.interface';

const ACTION_SCOPE = ['Cars'];

export namespace CarsActions {
  export class AddCar {
    static readonly type = `${ACTION_SCOPE} Add car`;
    constructor(
      public userId: string,
      public car: Car,
    ) {}
  }

  export class GetUserCars {
    static readonly type = `${ACTION_SCOPE} Get user cars by user id`;
    constructor(public userId: string) {}
  }
}
