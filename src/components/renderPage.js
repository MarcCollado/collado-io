import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import Header from './header';
import Layout from './layout';

// Styled Components

const CoverImage = styled(GatsbyImage)`
  margin: 1em 0em 0.5em;
`;

// Main Components

const RenderPage = ({
  children,
  article,
  coverImage,
  md,
  pathname,
  seoImage,
}) => {
  return (
    <Layout
      article={article}
      description={md.excerpt}
      pathname={pathname}
      image={seoImage}
      title={md.title}
    >
      <Header title={md.title} subtitle={md.excerpt} />
      {coverImage && (
        <CoverImage image={coverImage} title={md.title} alt={md.excerpt} />
      )}
      <div dangerouslySetInnerHTML={{ __html: md.html }} />
      {children}
    </Layout>
  );
};

export default RenderPage;
