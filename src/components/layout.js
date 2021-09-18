import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import 'normalize.css';

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

const StyledImg = styled(GatsbyImage)`
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

// Main Components

const Layout = ({ children, article, description, image, pathname, title }) => {
  // GraphQL
  const data = useStaticQuery(graphql`
    query AvatarQuery {
      file(relativePath: { eq: "logos/marc.png" }) {
        childImageSharp {
          gatsbyImageData(width: 256)
        }
      }
    }
  `);

  const avatar = data.file.childImageSharp.gatsbyImageData;

  return (
    <>
      <Seo
        isArticle={article}
        pageDescription={description}
        pageImage={image}
        pageTitle={title}
        pathname={pathname}
      />
      <InnerContainer>
        <FlexCenter>
          <Link to="/">
            <StyledImg image={avatar} alt="Marc Collado" pathname={pathname} />
          </Link>
        </FlexCenter>
        {children}
      </InnerContainer>
    </>
  );
};

export default Layout;
