import { BALANCE_REFRESH_RATE, CURRENCY_REFRESH_RATE } from '@src/constants';

import { dispatchToMainStore } from '@background/redux/utils';
import { serviceMessage } from '@background/service-message';

import { DataResponse, Payload } from '@libs/services/types';

import { queryClient } from '../query-client';
import { handleError, toJson } from '../utils';
import { getAccountBalanceUrl, getCurrencyRateUrl } from './constants';
import {
  AccountData,
  FetchBalanceResponse,
  GetCurrencyRateRequestResponse
} from './types';

export const currencyRateRequest = (
  casperClarityApiUrl: string,
  signal?: AbortSignal
): Promise<GetCurrencyRateRequestResponse> =>
  fetch(getCurrencyRateUrl(casperClarityApiUrl), { signal })
    .then(toJson)
    .catch(handleError);

export const accountBalanceRequest = (
  accountHash: string,
  casperWalletApiUrl: string,
  signal?: AbortSignal
): Promise<AccountData> => {
  if (!accountHash) {
    throw Error('Missing account hash');
  }

  return fetch(getAccountBalanceUrl({ accountHash, casperWalletApiUrl }), {
    signal
  })
    .then(res => {
      if (res.status === 404) {
        return {
          data: {
            balance: 0
          } as AccountData
        };
      }

      return toJson(res);
    })
    .catch(handleError);
};

export const dispatchFetchActiveAccountBalance = (
  accountHash = ''
): Promise<Payload<FetchBalanceResponse>> =>
  dispatchToMainStore(serviceMessage.fetchBalanceRequest({ accountHash }));

export const fetchAccountBalance = ({
  accountHash,
  casperWalletApiUrl
}: {
  accountHash: string;
  casperWalletApiUrl: string;
}): Promise<DataResponse<AccountData>> =>
  queryClient.fetchQuery(
    ['getAccountBalanceRequest', accountHash, casperWalletApiUrl],
    ({ signal }) =>
      accountBalanceRequest(accountHash, casperWalletApiUrl, signal),
    {
      staleTime: BALANCE_REFRESH_RATE
    }
  );

export const fetchCurrencyRate = ({
  casperClarityApiUrl
}: {
  casperClarityApiUrl: string;
}) =>
  queryClient.fetchQuery(
    'getCurrencyRateRequest',
    ({ signal }) => currencyRateRequest(casperClarityApiUrl, signal),
    {
      staleTime: CURRENCY_REFRESH_RATE
    }
  );
