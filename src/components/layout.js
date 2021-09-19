import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'normalize.css';

import { fluid } from '../utils/fluid';
import Header from './header';
import { FlexCenter } from '../styles/containers';
import GlobalStyles from '../styles/global';
import Seo from '../utils/seo';

// Styled Components

// TODO: get rid of this container by making outter flex
const Container = styled.div`
  display: flex;
  flex-flow: column;
  margin-block-end: ${fluid(24, 48)};
`;

const StyledAvatar = styled(GatsbyImage)`
  width: ${fluid(64, 80)};
  margin: 0px auto ${fluid(16, 40)};

  & img {
    border-radius: ${fluid(32, 40)};
  }

  @media (min-width: 768px) {
    transition: all 300ms ease-in-out;

    &:hover {
      transform: ${(props) =>
        props.pathname === '/' ? 'scale(1, 1)' : 'scale(1.15, 1.15)'};
    }
  }
`;

const CoverImage = styled(GatsbyImage)`
  margin: ${fluid(16, 20)} 0em ${fluid(8, 12)};
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
      <GlobalStyles />
      <Seo
        isArticle={article}
        pageDescription={excerpt}
        pageImage={seoImage}
        pageTitle={title}
        pathname={pathname}
      />
      <Container>
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
      </Container>
    </>
  );
};

export default Layoutt;
