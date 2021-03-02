import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { PublishedAt } from './PublishedAt';

// Styled Components

const PostCardContainer = styled.div`
  border: 1px solid var(--fakeAsbestosAlpha22);
  border-radius: 0.25em;
  box-shadow: var(--fakeAsbestosAlpha22) 0 0.125em 0.25em 0;
  margin: 0.75em 0 0.25em;
  display: flex;
  align-items: center;

  transition: box-shadow 300 ease;

  &:hover,
  &:active {
    box-shadow: var(--fakeAsbestosAlpha22) 0 0.5em 1em 0;
  }
`;

const PostCardThumbnail = styled.div`
  width: 60%;
  max-width: 125px;
  padding: 0;
  margin: 0;

  @media (max-width: 374px) {
    display: none;
  }

  @media (min-width: 576px) {
    width: 25%;
    max-width: 137px;
  }

  @media (min-width: 768px) {
    width: 21%;
    max-width: 145px;
  }

  @media (min-width: 1024px) {
    max-width: 150px;
  }
`;

const PostCardInnerContainer = styled.div`
  padding: 1em 1.5em;
  display: flex;
  flex-direction: column;
`;

const PostCardTitle = styled.h2`
  margin-top: 0.25em;
`;

const PostCardExcerpt = styled.p`
  margin: 0.5em 0;
  font-size: smaller;
`;

// Main Components

const PostCard = ({ date, excerpt, image, path, title }) => (
  <Link to={path}>
    <PostCardContainer>
      {image && (
        <PostCardThumbnail>
          <Img fluid={image} alt={title} />
        </PostCardThumbnail>
      )}
      <PostCardInnerContainer>
        <PostCardTitle>{title}</PostCardTitle>
        <PostCardExcerpt>{excerpt}</PostCardExcerpt>
        {date && <PublishedAt date={date} />}
      </PostCardInnerContainer>
    </PostCardContainer>
  </Link>
);

export default PostCard;
