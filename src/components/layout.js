import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import 'normalize.css';

import SEO from '../utils/seo';

// Styled Components

// TODO: use fluid to improve spacing between containers and titles
const OutterContainer = styled.div`
  width: clamp(375px, 100%, 960px);
  margin: 2em auto;

  @media (min-width: 576px) {
    margin: 3em auto;
  }

  @media (min-width: 768px) {
    margin: 4em auto;
  }

  @media (min-width: 1024px) {
    margin: 5em auto;
  }
`;

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

const StyledImg = styled(Img)`
  margin: 0em auto 1.5em;
  width: 4em;
  border-radius: 2.5em;

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
          fluid(maxWidth: 144) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const avatar = data.file.childImageSharp.fluid;

  return (
    <OutterContainer>
      <SEO
        title={title}
        description={description}
        pathname={pathname}
        image={image}
        article={article}
      />
      <InnerContainer>
        <Link to="/">
          <StyledImg fluid={avatar} alt="Marc Collado" pathname={pathname} />
        </Link>
        {children}
      </InnerContainer>
    </OutterContainer>
  );
};

export default Layout;
