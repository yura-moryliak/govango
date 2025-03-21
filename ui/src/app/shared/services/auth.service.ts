import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'x-fingerprint': credentials.fingerprint,
    });

    return this.httpClient.post<{ access_token: string }>(
      `${this.baseUrl}/login`,
      { email: credentials.email, password: credentials.password },
      { headers: headers, withCredentials: true },
    );
  }

  logout(fingerprint: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'x-fingerprint': fingerprint });
    return this.httpClient.post<boolean>(
      `${this.baseUrl}/logout`,
      {},
      { headers: headers, withCredentials: true },
    );
  }
}
