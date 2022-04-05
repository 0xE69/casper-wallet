import styled, { css } from 'styled-components';
import { TitleAlign } from './types';

interface StyledTitleProps {
  align: TitleAlign;
}

const common = css<StyledTitleProps>`
  text-align: ${({ align }) => align};
  color: ${({ theme }) => theme.header.main};
`;

export const H1 = styled.h1`
  ${common};

  font-weight: 700;
  font-size: 24px;

  line-height: 28px;
`;

export const H2 = styled.h2`
  ${common};
`;

export const H3 = styled.h3`
  ${common};
`;

export const H4 = styled.h4`
  ${common};
`;

export const H5 = styled.h5`
  ${common};
`;

export const H6 = styled.h6`
  ${common};
`;
