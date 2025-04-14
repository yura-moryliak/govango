import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { endpointUrls } from '../endpoint-urls';
import { HttpClient } from '@angular/common/http';
import { Car } from '../states/cars/cars.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly baseUrl: string = `${environment.nestJsBaseUrl}${endpointUrls.cars}`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  addCar(userId: string, car: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.baseUrl}/${userId}`, car);
  }

  getUserCars(userId: string): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.baseUrl}/${userId}`);
  }

  updateCar(userId: string, car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.baseUrl}/${userId}/${car.id}`, car);
  }

  uploadCarImages(carId: string, files: File[]): Observable<Car> {
    const formData = new FormData();
    files.forEach((file: File) => formData.append('images', file));
    return this.httpClient.post<Car>(
      `${this.baseUrl}/${carId}/images`,
      formData,
    );
  }

  removeCar(userId: string, carId: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${userId}/${carId}`);
  }
}
