import { LoginCredentialsInterface } from '../../../modules/auth/login/interfaces/login-credentials.interface';

const ACTION_SCOPE = ['Auth'];

export namespace AuthActions {
  export class Login {
    static readonly type = `${ACTION_SCOPE} Login`;
    constructor(public credentials: LoginCredentialsInterface) {}
  }

  export class RefreshToken {
    static readonly type = `${ACTION_SCOPE} Refresh Token`;
    constructor(public access_token: string) {}
  }

  export class Logout {
    static readonly type = `${ACTION_SCOPE} Logout`;
  }

  export class SetFingerprint {
    static readonly type = `${ACTION_SCOPE} Set fingerprint`;
    constructor(public fingerprint: string) {}
  }

  export class LoginWithGoogle {
    static readonly type = `${ACTION_SCOPE} Login with Google`;
    constructor(public credential: string) {}
  }

  export class ResetPassword {
    static readonly type = `${ACTION_SCOPE} Reset Password`;
    constructor(public email: string) {}
  }

  export class ConfirmResetPassword {
    static readonly type = `${ACTION_SCOPE} Confirm Reset Password`;
    constructor(
      public token: string,
      public password: string,
    ) {}
  }
}
