import React from 'react';
import styled from 'styled-components';

import { fluid } from '../utils/fluid';

// Styled Components

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: ${fluid(8, 12)} auto 0px;
  text-align: center;
`;

const Subtitle = styled.p`
  margin-block-start: ${fluid(4, 8)};
  font-size: smaller;
  text-align: center;
  text-transform: uppercase;
  color: var(--fakeAsbestos88);
`;

// Main Components

const Header = ({ subtitle, title }) => (
  <FlexCenter>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </FlexCenter>
);

export default Header;
