import { Action, Selector, State, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppSettingsPanelActions } from './app-settings-panel.actions';

export interface AppSettingsPanelStateModel {
  isOpened: boolean;
  isDarkMode: boolean;
  defaultLanguage: string;
}

export const APP_SETTINGS_PANEL_STATE_TOKEN =
  new StateToken<AppSettingsPanelStateModel>('appSettingsPanel');

@State<AppSettingsPanelStateModel>({
  name: APP_SETTINGS_PANEL_STATE_TOKEN,
  defaults: {
    isOpened: false,
    isDarkMode: false,
    defaultLanguage: 'ua',
  },
})
@Injectable()
export class AppSettingsPanelState {
  @Selector()
  static isOpened(state: AppSettingsPanelStateModel): boolean {
    return state.isOpened;
  }

  @Selector()
  static isDarkMode(state: AppSettingsPanelStateModel): boolean {
    return state.isDarkMode;
  }

  @Action(AppSettingsPanelActions.Open)
  open({ patchState }: any): void {
    patchState({ isOpened: true });
  }

  @Action(AppSettingsPanelActions.Close)
  close({ patchState }: any): void {
    patchState({ isOpened: false });
  }

  @Action(AppSettingsPanelActions.ToggleTheme)
  toggleTheme({ patchState, getState }: any): void {
    const element = document.querySelector('html');
    const newDarkMode = !getState().isDarkMode;

    if (element) {
      if (newDarkMode) {
        element.classList.add('gvg-dark-theme');
      } else {
        element.classList.remove('gvg-dark-theme');
      }
    }

    patchState({ isDarkMode: newDarkMode });
  }
}
