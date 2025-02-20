import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Contact } from '@background/redux/contacts/types';

import {
  ContentContainer,
  LeftAlignedFlexColumn,
  SpacingSize
} from '@libs/layout';
import {
  Avatar,
  Hash,
  HashVariant,
  Tile,
  Typography
} from '@libs/ui/components';
import { formatShortTimestamp } from '@libs/ui/utils';

const Container = styled(LeftAlignedFlexColumn)`
  margin-top: 24px;
  padding: 32px 16px 16px;

  gap: 32px;
`;

interface ContactDetailsProps {
  contact: Contact;
}

export const ContactDetails = ({ contact }: ContactDetailsProps) => {
  const { t } = useTranslation();

  return (
    <ContentContainer>
      <Tile>
        <Container>
          <Avatar publicKey={contact.publicKey} size={89} />
          <LeftAlignedFlexColumn gap={SpacingSize.Large}>
            <Typography type="header">{contact.name}</Typography>
            <Hash
              value={contact.publicKey}
              variant={HashVariant.CaptionHash}
              color="contentPrimary"
            />
            <Typography type="captionRegular" color="contentSecondary">
              <Trans t={t}>
                Last edited: {formatShortTimestamp(contact.lastModified)}
              </Trans>
            </Typography>
          </LeftAlignedFlexColumn>
        </Container>
      </Tile>
    </ContentContainer>
  );
};
