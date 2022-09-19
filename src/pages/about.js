import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';
import { extractMarkdown } from '../utils/helpers';

const About = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title;
  const authorName = data.site.siteMetadata?.author?.name;
  const markdownData = extractMarkdown(data.allMarkdownRemark.edges);
  return (
    <Layout location={location}>
      {/* <SEO title={siteTitle}></SEO> */}
      <p className="heading-companion">{markdownData.title}</p>
      <h1 className="heading">{authorName}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownData.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        author {
          name
        }
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/pages/about.md/" }
      }
      limit: 1
    ) {
      ...pageMarkdown
    }
  }
`;

export default About;
