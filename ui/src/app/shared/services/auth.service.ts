import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpointUrls } from '../endpoint-urls';
import { environment } from '../../../environments/environment';
import { LoginCredentialsInterface } from '../../modules/auth/login/interfaces/login-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = `${environment.nestJsBaseUrl}${endpointUrls.auth}`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  login(
    credentials: LoginCredentialsInterface,
  ): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(
      `${this.baseUrl}/login`,
      { email: credentials.email, password: credentials.password },
    );
  }

  refreshToken(): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(
      `${this.baseUrl}/refresh`,
      {},
    );
  }

  logout(): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}/logout`, {});
  }
}
