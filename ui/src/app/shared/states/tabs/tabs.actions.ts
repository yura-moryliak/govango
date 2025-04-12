export const ACTION_SCOPE = ['Tabs'];

export namespace TabsActions {
  export class ActiveTabIndex {
    static readonly type = `${ACTION_SCOPE} Active tab index`;
    constructor(public index: number) {}
  }

  export class ActiveTabPath {
    static readonly type = `${ACTION_SCOPE} Active tab path`;
    constructor(public path: string) {}
  }
}
