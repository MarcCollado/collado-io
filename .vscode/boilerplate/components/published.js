import React from 'react';
import styled from 'styled-components';

// Styled Components

const Date = styled.p`
  font-size: smaller;
  color: var(--fakeAsbestos88);
`;

const Published = ({ date }) => (
  <span>
    <Date>{`Published on ${date}`}</Date>
  </span>
);

export default Published;
