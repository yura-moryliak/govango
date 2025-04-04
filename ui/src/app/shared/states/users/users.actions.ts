const ACTION_SCOPE = ['Users'];

export namespace UsersActions {

  export class LoadCurrentUser {
    static readonly type = `${ ACTION_SCOPE } Load current user`;
    constructor(public id: string) { }
  }

}
