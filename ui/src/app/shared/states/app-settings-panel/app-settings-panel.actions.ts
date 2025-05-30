const ACTIONS_SCOPE = '[AppSettingsPanel]';

export namespace AppSettingsPanelActions {
  export class Open {
    static readonly type = `${ACTIONS_SCOPE} Open`;
  }

  export class Close {
    static readonly type = `${ACTIONS_SCOPE} Close`;
  }

  export class ToggleTheme {
    static readonly type = `${ACTIONS_SCOPE} Toggle Theme`;
  }

  export class SetLanguage {
    static readonly type = `${ACTIONS_SCOPE} Set Language`;
    constructor(public language: string) {}
  }
}
