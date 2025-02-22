const ACTIONS_SCOPE = 'AppSettingsPanel';

export namespace AppSettingsPanelActions {
  export class Open {
    static readonly type = `[${ACTIONS_SCOPE}] Open`;
  }

  export class Close {
    static readonly type = `[${ACTIONS_SCOPE}] Close`;
  }
}
