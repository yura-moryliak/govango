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

  export class UpdateCarInManageCarsSidebar {
    static readonly type = `${ACTION_SCOPE} Update car in manage cars sidebar`;
    constructor(public car: Car) {}
  }

  export class UpdateUploadCarImagesSidebar {
    static readonly type = `${ACTION_SCOPE} Update upload car images sidebar`;
    constructor(public carId: string) {}
  }

  export class ClearCarToUpdate {
    static readonly type = `${ACTION_SCOPE} Clear car to update`;
  }

  export class UpdateCar {
    static readonly type = `${ACTION_SCOPE} Update car`;
    constructor(
      public userId: string,
      public car: Car,
    ) {}
  }

  export class UploadCarImages {
    static readonly type = `${ACTION_SCOPE} Upload car images`;
    constructor(
      public carId: string,
      public userId: string,
      public files: File[],
    ) {}
  }

  export class RemoveCar {
    static readonly type = `${ACTION_SCOPE} Remove car`;
    constructor(
      public userId: string,
      public carId: string,
    ) {}
  }
}
