import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { extractMarkdown } from '../utils/helpers';

const Home = ({ data, location }) => {
  const markdownData = extractMarkdown(data.allMarkdownRemark.edges);
  const seoData = {
    pageDescription: ``,
    pageTitle: ``,
  };
  return (
    <Layout location={location} seoData={seoData}>
      <p className="heading-companion">Hola! I'm</p>
      <h1 className="heading">Marc Collado</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownData.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/media/pages/index.md/" } }
      limit: 1
    ) {
      ...staticPage
    }
  }
`;

export default Home;
