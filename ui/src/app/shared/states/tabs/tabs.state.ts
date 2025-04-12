import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { TabsActions } from './tabs.actions';

export interface TabsStateModel {
  path: string | null;
  index: number;
}

export const TABS_STATE_TOKEN = new StateToken<TabsStateModel>('tabs');

@State({
  name: TABS_STATE_TOKEN,
  defaults: {
    path: null,
    index: 0,
  },
})
@Injectable()
export class TabsState {
  @Selector()
  static index(state: TabsStateModel): number {
    return state.index;
  }

  @Selector()
  static path(state: TabsStateModel): string | null {
    return state.path;
  }

  @Action(TabsActions.ActiveTabIndex)
  setActiveTabIndex(
    { patchState }: StateContext<TabsStateModel>,
    { index }: TabsActions.ActiveTabIndex,
  ) {
    patchState({ index });
  }

  @Action(TabsActions.ActiveTabPath)
  setActiveTabPath(
    { patchState }: StateContext<TabsStateModel>,
    { path }: TabsActions.ActiveTabPath,
  ) {
    patchState({ path });
  }
}
