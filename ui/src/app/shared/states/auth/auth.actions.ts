import { LoginCredentialsInterface } from '../../../modules/auth/login/interfaces/login-credentials.interface';

const ACTION_SCOPE = ['Auth'];

export namespace AuthActions {
  export class Login {
    static readonly type = `${ACTION_SCOPE} Login`;
    constructor(public credentials: LoginCredentialsInterface) {}
  }
}
