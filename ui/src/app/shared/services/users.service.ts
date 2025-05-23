import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { endpointUrls } from '../endpoint-urls';
import { environment } from '../../../environments/environment';
import { RegisterUserInterface } from '../../modules/auth/register/interfaces/register-user.interface';
import { Store } from '@ngxs/store';
import { AppSettingsPanelState } from '../states/app-settings-panel/app-settings-panel.state';
import { User } from '../states/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private store: Store = inject(Store);
  private readonly baseUrl: string = `${environment.nestJsBaseUrl}${endpointUrls.users}`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  registerUser(userData: RegisterUserInterface): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'x-user-language': this.store.selectSnapshot(
        AppSettingsPanelState.getLanguage,
      ),
    });

    return this.httpClient.post<boolean>(
      `${this.baseUrl}/${!userData.userInfo.isCarOwner ? 'customer' : 'carrier'}`,
      userData,
      { headers },
    );
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: Partial<User>): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/${user.id}`, user);
  }

  uploadAvatar(id: string, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('avatar', file);

    return this.httpClient
      .post<{ avatarUrl: string }>(`${this.baseUrl}/${id}/avatar`, formData)
      .pipe(map((data: { avatarUrl: string }) => data.avatarUrl));
  }
}
