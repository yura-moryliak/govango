import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Store } from '@ngxs/store';
import { AuthActions } from '../states/auth/auth.actions';

export interface GoogleAuthResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private readonly clientId = environment.googleAuth.clientId;
  private readonly store: Store = inject(Store);

  initialize(): void {
    if (!window.google?.accounts?.id) {
      console.error('Google SDK not found');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: GoogleAuthResponse) => this.handleCredential(response)
    });

    window.google.accounts.id.renderButton(
      document.getElementById('gvg-google-login-render-placeholder'),
      {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with',
        shape: 'square',
        width: '100%',
      }
    );
  }

  private handleCredential(response: GoogleAuthResponse): void {
    if (!response?.credential) {
      console.log('Google Auth data not found: ', response);
      return;
    }

    this.store.dispatch(new AuthActions.LoginWithGoogle(response.credential));
  }
}
