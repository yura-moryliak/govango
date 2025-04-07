import { Car } from './cars.interface';
import {
  Action,
  createSelector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { CarsActions } from './cars.actions';
import { CarService } from '../../services/cars.service';
import { Observable, tap } from 'rxjs';

export interface CarsStateModel {
  byId: {
    [userId: string]: {
      cars: Car[];
    };
  };
}

export const CARS_STATE_TOKEN = new StateToken<CarsStateModel>('cars');

@State({
  name: CARS_STATE_TOKEN,
  defaults: {
    byId: {},
  },
})
@Injectable()
export class CarsState {
  private readonly carsService: CarService = inject(CarService);

  static carsByUserId(userId: string) {
    return createSelector(
      [CarsState],
      () => (state: CarsStateModel) => state.byId[userId].cars,
    );
  }

  @Action(CarsActions.AddCar, { cancelUncompleted: true })
  addCar(
    { getState, patchState }: StateContext<CarsStateModel>,
    { userId, car }: CarsActions.AddCar,
  ): Observable<Car> {
    return this.carsService.addCar(userId, car).pipe(
      tap((addedCar: Car) => {
        const userCars: Car[] = getState().byId[userId]?.cars || [];
        const updatedUserCars: Car[] = [...userCars, addedCar];

        patchState({
          byId: {
            ...getState().byId,
            [userId]: {
              ...getState().byId[userId],
              cars: updatedUserCars,
            },
          },
        });
      }),
    );
  }
}
