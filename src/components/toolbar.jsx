import React from 'react';
import styled from 'styled-components';

import Filter from './filter';

// Styled Components

const ToolbarContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 8px auto;
  width: 100%;

  @media (min-width: 768px) {
    justify-content: flex-end;
`;

// Main Components

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <Filter />
    </ToolbarContainer>
  );
};

export default Toolbar;
