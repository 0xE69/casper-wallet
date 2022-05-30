import { ActionType, StateType } from 'typesafe-actions';
import { VaultState } from './vault/types';
import { WindowManagementState } from './windowManagement/types';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootStateKey = Extract<
    keyof StateType<typeof import('./root-reducer').default>,
    string
  >;
  export type RootState = Pick<
    StateType<typeof import('./root-reducer').default>,
    RootStateKey
  >;
  export type Services = typeof import('@libs/services');

  interface Types {
    RootAction: RootAction;
  }
}

export interface State {
  vault: VaultState;
  windowManagement: WindowManagementState;
}
