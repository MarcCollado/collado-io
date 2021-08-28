import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { PublishedAt } from './PublishedAt';

// Styled Components

const PostCardContainer = styled.div`
  display: ${(props) => (props.image ? 'flex' : 'block')};
  padding-bottom: 0.75em;
  border-bottom: 1px solid var(--fakeAsbestos22);
`;

const StyledImg = styled(Img)`
  // TODO: find a more elegant and responsive solution
  min-width: 4em;
  border-radius: 2.5em;
  margin: 2.25em 1.5em 1.25em 0;

  @media (min-width: 576px) {
    width: 5em;
    margin: 1.5em 1.5em 0.25em 0;
  }
`;

const PostCardExcerpt = styled.p`
  margin-top: -0.5em;
  font-size: smaller;
`;

// Main Components

const PostCard = ({ date, excerpt, image, path, title }) => (
  <PostCardContainer image={!!image}>
    {image && <StyledImg fluid={image} alt={title} />}
    <Link to={path}>
      <h2>{title}</h2>
      <PostCardExcerpt>{excerpt}</PostCardExcerpt>
    </Link>
    {date && <PublishedAt date={date} />}
  </PostCardContainer>
);

export default PostCard;
