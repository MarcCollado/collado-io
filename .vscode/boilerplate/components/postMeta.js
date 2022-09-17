import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { FlexCenter } from '../styles/containers';
import { fluid } from '../utils/fluid';
import Published from './published';
import Tag from './tag';

// Styled Components

const LinkContainer = styled.div`
  float: ${(props) => (props.isPrev ? 'left' : 'right')};
  margin: ${fluid(32, 64)} 1em 0em;
`;

const MetaContainer = styled(FlexCenter)`
  margin-top: ${fluid(24, 48)};
`;

const TagsContainer = styled(FlexCenter)`
  flex-flow: row wrap;
`;

const StyledSpan = styled.span`
  font-family: 'IBM Plex Mono', monospace;
  font-size: smaller;
  text-decoration: none;
  color: var(--hipBlack);
`;

const StyledLink = styled(Link)`
  border-bottom: 0.25em solid var(--bianchiGreen);
  box-shadow: inset 0 -0.25em 0 var(--bianchiGreen);
  padding-top: 0.25em;
  font-family: 'IBM Plex Mono', monospace;
  font-size: smaller;
  letter-spacing: -1px;
  text-decoration: none;
  color: var(--hipBlack);
  transition: background 0.3s ease;

  &:hover {
    background: var(--bianchiGreen);
  }
`;

const PostMeta = ({ date, tags, next, prev }) => (
  <>
    <div>
      {!!prev && (
        <LinkContainer isPrev={prev}>
          <StyledSpan>{`—— `}</StyledSpan>
          <StyledLink to={prev}>previous post</StyledLink>
        </LinkContainer>
      )}
      {!!next && (
        <LinkContainer>
          <StyledLink to={next}>next post</StyledLink>
          <StyledSpan>{` ——`}</StyledSpan>
        </LinkContainer>
      )}
    </div>
    <MetaContainer>
      <Published date={date} />
      <TagsContainer>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>
    </MetaContainer>
  </>
);

export default PostMeta;
