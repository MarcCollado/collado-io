import * as React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import { extractMarkdown } from '../utils/helpers';

const NotFound = ({ data }) => {
  const markdownData = extractMarkdown(data.allMarkdownRemark.edges);
  return (
    <>
      <p className="heading-companion">{markdownData.title}</p>
      <h1 className="heading">{markdownData.excerpt}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownData.html }} />
    </>
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
  <Seo pageTitle="404" pageDescription="Page not found" location={location} />
);

export default NotFound;
