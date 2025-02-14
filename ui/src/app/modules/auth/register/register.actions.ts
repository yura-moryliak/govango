import { RegisterStepEnum } from './register.component';
import { UserInfoDataInterface } from './interfaces/user-info-data.interface';

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
}
