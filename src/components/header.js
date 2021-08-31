import React from 'react';
import styled from 'styled-components';

// Styled Components

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const Subtitle = styled.p`
  margin-block-start: 0.25em;
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
