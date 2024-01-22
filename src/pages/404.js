import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { extractMarkdown } from '../utils/helpers';

const NotFound = ({ data, location }) => {
  const markdownData = extractMarkdown(data.allMarkdownRemark.edges);
  return (
    <Layout location={location}>
      <p className="heading-companion">{markdownData.title}</p>
      <h1 className="heading">{markdownData.excerpt}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownData.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/media/pages/404.md/" } }
      limit: 1
    ) {
      ...staticPage
    }
  }
`;

export const Head = ({ location }) => (
  <Seo
    pageTitle="404 — Marc Collado"
    pageDescription="Page not found"
    location={location}
  />
);

export default NotFound;
