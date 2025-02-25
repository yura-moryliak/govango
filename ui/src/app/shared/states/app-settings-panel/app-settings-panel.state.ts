import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { inject, Injectable } from '@angular/core';
import { AppSettingsPanelActions } from './app-settings-panel.actions';
import { TranslateService } from '@ngx-translate/core';

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
  private translate: TranslateService = inject(TranslateService);

  @Selector()
  static isOpened(state: AppSettingsPanelStateModel): boolean {
    return state.isOpened;
  }

  @Selector()
  static isDarkMode(state: AppSettingsPanelStateModel): boolean {
    return state.isDarkMode;
  }

  @Selector()
  static getLanguage(state: AppSettingsPanelStateModel) {
    return state.defaultLanguage;
  }

  @Action(AppSettingsPanelActions.Open)
  open({ patchState }: StateContext<AppSettingsPanelStateModel>): void {
    patchState({ isOpened: true });
  }

  @Action(AppSettingsPanelActions.Close)
  close({ patchState }: StateContext<AppSettingsPanelStateModel>): void {
    patchState({ isOpened: false });
  }

  @Action(AppSettingsPanelActions.ToggleTheme)
  toggleTheme({
    patchState,
    getState,
  }: StateContext<AppSettingsPanelStateModel>): void {
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

  @Action(AppSettingsPanelActions.SetLanguage)
  setLanguage(
    { patchState }: StateContext<AppSettingsPanelStateModel>,
    { language }: AppSettingsPanelActions.SetLanguage,
  ): void {
    patchState({ defaultLanguage: language });
    this.translate.use(language);
  }
}
