import { User } from './user.interface';

const ACTION_SCOPE = ['Users'];

export namespace UsersActions {
  export class LoadCurrentUser {
    static readonly type = `${ACTION_SCOPE} Load current user`;
    constructor(public id: string) {}
  }

  export class UpdateCurrentUser {
    static readonly type = `${ACTION_SCOPE} Update current user`;
    constructor(public user: Partial<User>) {}
  }

  export class ClearCurrentUser {
    static readonly type = `${ACTION_SCOPE} Clear current user`;
  }
}
