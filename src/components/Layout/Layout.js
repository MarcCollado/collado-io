import React from 'react';
import styled from 'styled-components';
import 'normalize.css';

import { Footer } from '../Footer';
import { Navbar } from '../Navbar';
import SEO from '../../utils/seo';

// Styled Components

const OutterContainer = styled.div`
  min-width: 320px;
`;

const InnerContainer = styled.div`
  max-width: 800px;
  margin: 0em auto;
  padding: 0 1.5em;
  display: flex;
  flex-flow: column;

  @media (min-width: 576px) {
    padding: 0 2em;
  }

  @media (min-width: 768px) {
    padding: 0 3em;
  }

  @media (min-width: 1024px) {
    padding: 0 4em;
  } ;
`;

// Main Components

const Layout = ({ article, children, description, image, pathname, title }) => {
  return (
    <OutterContainer>
      <SEO
        title={title}
        description={description}
        pathname={pathname}
        image={image}
        article={article}
      />
      <Navbar />
      <InnerContainer>{children}</InnerContainer>
      <Footer />
    </OutterContainer>
  );
};

export default Layout;
