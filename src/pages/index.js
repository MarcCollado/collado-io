import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';
import { extractMarkdown } from '../utils/helpers';

const Home = ({ data, location }) => {
  const siteTitle =
    data.site.siteMetadata?.title || `Marc Collado's personal website`;
  const markdownFile = extractMarkdown(data.allMarkdownRemark.edges);
  return (
    <Layout location={location}>
      {/* <SEO title={siteTitle}></SEO> */}
      <p className="global-header">Hola! I'm</p>
      <h1 className="main-heading">Marc Collado</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownFile.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/pages/index.md/" }
      }
      limit: 1
    ) {
      ...pageMarkdown
    }
  }
`;

export default Home;
