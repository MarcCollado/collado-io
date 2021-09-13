import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'normalize.css';

import Header from './header';
import { FlexCenter } from '../styles/containers';
import Seo from '../utils/seo';

// Styled Components

// TODO: get rid of this container by making outter flex
const InnerContainer = styled.div`
  margin: auto 2em;
  display: flex;
  flex-flow: column;

  @media (min-width: 576px) {
    margin: auto 3em;
  }

  @media (min-width: 768px) {
    margin: auto 4em;
  }

  @media (min-width: 1024px) {
    margin: auto 5em;
  }
`;

const StyledAvatar = styled(GatsbyImage)`
  width: 4em;
  margin: 0em auto 1.5em;

  & img {
    border-radius: 2em;
  }

  @media (min-width: 576px) {
    margin: 0em auto 2em;
  }

  @media (min-width: 768px) {
    margin: 0em auto 2.5em;
    transition: all 300ms ease-in-out;

    &:hover {
      transform: ${(props) =>
        props.pathname === '/' ? 'scale(1, 1)' : 'scale(1.15, 1.15)'};
    }
  }
  @media (min-width: 1024px) {
    margin: 0em auto 3em;
  }
`;

const CoverImage = styled(GatsbyImage)`
  margin: 1em 0em 0.5em;
`;

// Main Components

const Layoutt = ({ children, article, coverImage, md, pathname, seoImage }) => {
  // GraphQL
  const data = useStaticQuery(graphql`
    query AvatarrQuery {
      file(relativePath: { eq: "logos/marc.png" }) {
        childImageSharp {
          gatsbyImageData(width: 256)
        }
      }
    }
  `);

  const avatar = data.file.childImageSharp.gatsbyImageData;
  const { excerpt, html, title } = md;

  return (
    <>
      <Seo
        isArticle={article}
        pageDescription={excerpt}
        pageImage={seoImage}
        pageTitle={title}
        pathname={pathname}
      />
      <InnerContainer>
        <FlexCenter>
          <Link to="/">
            <StyledAvatar
              image={avatar}
              alt="Marc Collado"
              pathname={pathname}
            />
          </Link>
        </FlexCenter>
        {!article && <Header title={title} subtitle={excerpt} />}
        {!article && coverImage && (
          <CoverImage image={coverImage} title={title} alt={excerpt} />
        )}
        {!article && <div dangerouslySetInnerHTML={{ __html: html }} />}
        {children}
      </InnerContainer>
    </>
  );
};

export default Layoutt;
