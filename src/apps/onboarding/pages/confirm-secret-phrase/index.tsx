import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import {
  HeaderSubmenuBarNavLink,
  LayoutTab,
  TabFooterContainer,
  TabHeaderContainer
} from '@libs/layout';
import { Button } from '@libs/ui';
import { parseSecretKeyFileContent } from '@src/apps/import-account-with-file/pages/import-account-with-file/hooks/import-secret-key';
import { Stepper } from '@src/apps/onboarding/components/stepper';
import { RouterPath } from '@src/apps/onboarding/router';
import { useTypedNavigate } from '@src/apps/onboarding/router/use-typed-navigate';
import { dispatchToMainStore } from '@src/background/redux/utils';
import { accountCreated } from '@src/background/redux/vault/actions';

import { ConfirmSecretPhrasePageContent } from './content';

interface ConfirmSecretPhrasePageProps {
  phrase: string[] | null;
}

export function ConfirmSecretPhrasePage({
  phrase
}: ConfirmSecretPhrasePageProps) {
  const { t } = useTranslation();
  const navigate = useTypedNavigate();

  const [isConfirmationSuccess, setIsConfirmationSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  if (phrase == null) {
    return <Navigate to={RouterPath.CreateSecretPhrase} />;
  }

  function handleSubmit() {
    if (isConfirmationSuccess) {
      // temporary account creation, will be replaced by derivation logic
      const { publicKeyHex, secretKeyBase64 } = parseSecretKeyFileContent(
        'MC4CAQAwBQYDK2VwBCIEIKu6biwimq52O4qzdyAp78RrIblNs6GXZdkcqr0+iLLj'
      );
      const account = {
        publicKey: publicKeyHex,
        secretKey: secretKeyBase64
      };

      dispatchToMainStore(accountCreated(account));
      navigate(RouterPath.ConfirmSecretPhraseSuccess);
    } else {
      navigate(RouterPath.OnboardingError, {
        state: {
          errorHeaderText: t('Ah, that’s not guite a correct secret phrase'),
          errorContentText: t(
            'You can start over again. Make sure you save your secret phrase as a text file or write it down somewhere.'
          ),
          errorPrimaryButtonLabel: t('Start over again'),
          errorRedirectPath: RouterPath.CreateSecretPhrase
        }
      });
    }
  }

  return (
    <LayoutTab
      layoutContext="withStepper"
      renderHeader={() => (
        <TabHeaderContainer>
          <HeaderSubmenuBarNavLink linkType="back" />
          <Stepper length={6} activeIndex={4} />
        </TabHeaderContainer>
      )}
      renderContent={() => (
        <ConfirmSecretPhrasePageContent
          phrase={phrase}
          setIsFormValid={setIsFormValid}
          setIsConfirmationSuccess={setIsConfirmationSuccess}
        />
      )}
      renderFooter={() => (
        <TabFooterContainer>
          <Button disabled={!isFormValid} onClick={handleSubmit}>
            <Trans t={t}>Confirm</Trans>
          </Button>
        </TabFooterContainer>
      )}
    />
  );
}
