import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { endpointUrls } from '../endpoint-urls';
import { HttpClient } from '@angular/common/http';
import { RegisterUserInterface } from '../../modules/auth/register/interfaces/register-user.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.baseUrl}${endpointUrls.auth}`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  registerUser(userData: RegisterUserInterface): Observable<null> {
    console.log('Registering user with data:', userData);
    // return this.httpClient.post(`${this.baseUrl}/register`, userData);

    return of(null).pipe(delay(5000));
  }
}
