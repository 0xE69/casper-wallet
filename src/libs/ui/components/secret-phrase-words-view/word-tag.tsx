import React from 'react';
import styled from 'styled-components';

import { FlexRow, SpacingSize } from '@libs/layout';
import { Typography } from '@libs/ui/components';
import { getLinearGradientColor } from '@libs/ui/utils/get-linear-gradient-color';

interface IsEmptyWord {
  isEmptyWord?: boolean;
}

type DisabledOrSelected = Pick<WordTagProps, 'selected' | 'disabled'>;

const WordContainer = styled(FlexRow)<DisabledOrSelected & IsEmptyWord>`
  padding: 2px 8px;
  width: ${({ isEmptyWord }) => (isEmptyWord ? '72px' : 'unset')};
  background: ${({ theme, selected }) =>
    selected
      ? theme.color.fillPrimary
      : getLinearGradientColor(theme.color.fillSecondary)};
  color: ${({ theme, disabled, selected }) =>
    disabled
      ? theme.color.contentSecondary
      : selected
        ? theme.color.contentOnFill
        : 'inherit'};
  border-radius: 6px;
  cursor: ${({ onClick, disabled }) =>
    onClick && !disabled ? 'pointer' : 'auto'};
`;

interface WordTagProps {
  value: string | null;
  index: number;
  hideIndex?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onHiddenWordClick?: (index: number) => void;
}

export function WordTag({
  value,
  index,
  disabled,
  selected,
  hideIndex,
  onHiddenWordClick
}: WordTagProps) {
  const handleOnClick =
    !disabled && onHiddenWordClick != null && index != null
      ? () => onHiddenWordClick(index)
      : undefined;

  return (
    <WordContainer
      gap={SpacingSize.Tiny}
      disabled={disabled}
      selected={selected}
      isEmptyWord={value == null}
      onClick={handleOnClick}
    >
      {!hideIndex && (
        <Typography
          type="labelMedium"
          uppercase
          color={selected ? 'inherit' : 'contentSecondary'}
        >
          {index + 1}
        </Typography>
      )}
      <Typography type="body">{value}</Typography>
    </WordContainer>
  );
}
