import { Action, Selector, State, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppSettingsPanelActions } from './app-settings-panel.actions';

export interface AppSettingsPanelStateModel {
  isOpened: boolean;
}

export const APP_SETTINGS_PANEL_STATE_TOKEN =
  new StateToken<AppSettingsPanelStateModel>('appSettingsPanel');

@State<AppSettingsPanelStateModel>({
  name: APP_SETTINGS_PANEL_STATE_TOKEN,
  defaults: {
    isOpened: false,
  },
})
@Injectable()
export class AppSettingsPanelState {
  @Selector()
  static isOpened(state: AppSettingsPanelStateModel): boolean {
    return state.isOpened;
  }

  @Action(AppSettingsPanelActions.Open)
  open({ patchState }: any): void {
    patchState({ isOpened: true });
  }

  @Action(AppSettingsPanelActions.Close)
  close({ patchState }: any): void {
    patchState({ isOpened: false });
  }
}
