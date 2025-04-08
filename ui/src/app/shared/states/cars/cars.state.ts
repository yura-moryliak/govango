import { Car } from './cars.interface';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CarsActions } from './cars.actions';
import { CarService } from '../../services/cars.service';
import { patch } from '@ngxs/store/operators';

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

  @Selector()
  static byId(state: CarsStateModel): CarsStateModel['byId'] {
    return state.byId;
  }

  static carsByUserId(userId: string) {
    return createSelector([CarsState.byId], (byId) => byId[userId]?.cars);
  }

  @Action(CarsActions.AddCar, { cancelUncompleted: true })
  addCar(
    // eslint-disable-next-line no-empty-pattern
    {}: StateContext<CarsStateModel>,
    { userId, car }: CarsActions.AddCar,
  ): Observable<Car> {
    return this.carsService.addCar(userId, car);
  }

  @Action(CarsActions.GetUserCars, { cancelUncompleted: true })
  getUserCars(
    { getState, setState }: StateContext<CarsStateModel>,
    { userId }: CarsActions.GetUserCars,
  ): Observable<Car[]> | undefined {
    if (getState().byId[userId]) {
      return;
    }

    return this.carsService.getUserCars(userId).pipe(
      tap((cars: Car[]) => {
        setState(patch({ byId: patch({ [userId]: patch({ cars: cars }) }) }));
      }),
    );
  }
}
