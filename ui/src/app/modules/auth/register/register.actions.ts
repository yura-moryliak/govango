import { RegisterStepEnum } from './register.component';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';
import { UserCarInfoDataInterface } from './interfaces/user-car-info-data.interface';
import { UserCredentialsDataInterface } from './interfaces/user-credentials-data.interface';

const ACTION_SCOPE = '[Register]';

export namespace RegisterActions {
  export class SetActiveStep {
    static readonly type = `${ACTION_SCOPE} Set Active Step`;
    constructor(public activeStep: RegisterStepEnum) {}
  }

  export class AddUserInfoData {
    static readonly type = `${ACTION_SCOPE} Add User Info Data`;
    constructor(public payload: UserInfoDataInterface) {}
  }

  export class AddUserCredentialsData {
    static readonly type = `${ACTION_SCOPE} Add User Credentials Data`;
    constructor(
      public payload: UserCredentialsDataInterface,
      public formInvalid: boolean,
    ) {}
  }

  export class AddUserCarInfoData {
    static readonly type = `${ACTION_SCOPE} Add User Car Info Data`;
    constructor(
      public payload: UserCarInfoDataInterface,
      public formInvalid: boolean,
    ) {}
  }

  export class CompleteStep1 {
    static readonly type = `${ACTION_SCOPE} Complete Step 1`;
  }

  export class CompleteStep2 {
    static readonly type = `${ACTION_SCOPE} Complete Step 2`;
  }

  export class CompleteStep3 {
    static readonly type = `${ACTION_SCOPE} Complete Step 3`;
  }

  export class RegisterNewUser {
    static readonly type = `${ACTION_SCOPE} Register User`;
  }
}
