import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  // Google auth
  loginWithGoogle(credential: string): Observable<{ access_token: string }> {
    console.warn("G credentials", credential);
    return of({ access_token: 'some_token' });
    // return this.httpClient.post<{ access_token: string }>(
    //   `${this.baseUrl}/google-login`,
    //   { credential },
    // );
  }
}
