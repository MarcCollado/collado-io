import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { fluid } from '../utils/fluid';
import Published from './published';

// Styled Components

const PostCardContainer = styled.div`
  display: ${(props) => (props.image ? 'flex' : 'block')};
  padding-bottom: ${fluid(12, 16)};
  border-bottom: 1px solid var(--fakeAsbestos22);
`;

const StyledImg = styled(GatsbyImage)`
  max-width: ${fluid(64, 80)};
  max-height: ${fluid(64, 80)};
  // TODO: fix the workaround to position the image
  margin: 2.5em 1.5em 1em 0;

  & img {
    margin: ${fluid(8, 16)} auto 0px;
  }
`;

const PostCardExcerpt = styled.p`
  margin-top: -0.5em;
  font-size: smaller;
`;

// Main Components

const PostCard = ({ date, excerpt, image, path, title }) => (
  <PostCardContainer image={!!image}>
    {image && <StyledImg image={image} alt={title} />}
    <Link to={path}>
      <h2>{title}</h2>
      <PostCardExcerpt>{excerpt}</PostCardExcerpt>
    </Link>
    {date && <Published date={date} />}
  </PostCardContainer>
);

export default PostCard;
