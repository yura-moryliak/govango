import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointUrls } from '../endpoint-urls';
import { environment } from '../../../environments/environment';
import { RegisterUserInterface } from '../../modules/auth/register/interfaces/register-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl: string = `${environment.nestJsBaseUrl}${endpointUrls.users}`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  registerUser(userData: RegisterUserInterface): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseUrl}/${!userData.userInfo.isCarOwner ? 'customer' : 'carrier'}`,
      userData,
    );
  }
}
