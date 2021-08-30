import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

// Styled Components

const TagContainer = styled.div`
  padding: 0.125em 0.25em;
`;

const TagHash = styled.span`
  margin-inline-end: 2px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: smaller;
  text-decoration: none;
  color: var(--hipBlack);
`;

const TagLink = styled(Link)`
  border-block-end: 0.25em solid var(--bianchiGreen);
  box-shadow: inset 0 -0.25em 0 var(--bianchiGreen);
  padding-block-start: 0.25em;
  font-family: 'IBM Plex Mono', monospace;
  font-size: smaller;
  letter-spacing: -1px;
  text-decoration: none;
  color: var(--hipBlack);
  transition: background 0.3s ease;

  &:hover {
    background: var(--bianchiGreen);
  }
  // TODO: group this properties w/ the primary styles
  &:visited,
  &:active {
    border-block-end: 0.25em solid var(--bianchiGreen);
    box-shadow: inset 0 -0.25em 0 var(--bianchiGreen);
    padding-block-start: 0.25em;
    font-family: 'IBM Plex Mono', monospace;
    font-size: smaller;
    letter-spacing: -1px;
    text-decoration: none;
    color: var(--hipBlack);
    transition: background 0.3s ease;
  }
`;

// Main Components

const Tag = ({ children }) => (
  <TagContainer>
    <TagHash>#</TagHash>
    <TagLink to={`/tags/${children}`}>{`${children}`.toLowerCase()}</TagLink>
  </TagContainer>
);

export default Tag;
