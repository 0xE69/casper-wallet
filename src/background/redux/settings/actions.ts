import { createAction } from 'typesafe-actions';

import { TimeoutDurationSetting } from '@popup/constants';
import { NetworkSetting } from '@src/constants';
import { ThemeMode } from '@background/redux/settings/types';

export const activeTimeoutDurationSettingChanged = createAction(
  'ACTIVE_TIMEOUT_DURATION_SETTING_CHANGED'
)<TimeoutDurationSetting>();

export const activeNetworkSettingChanged = createAction(
  'ACTIVE_NETWORK_SETTING_CHANGED'
)<NetworkSetting>();

export const themeModeSettingChanged = createAction(
  'THEME_MODE_SETTING_CHANGED'
)<ThemeMode>();
