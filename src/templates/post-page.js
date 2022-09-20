import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';
import { toTitleCase } from '../utils/helpers';

const Post = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { date, excerpt, path, tags, title } = frontmatter;
  // const next = pageContext.next.frontmatter.path;
  // const prev = pageContext.prev.frontmatter.path;

  return (
    <Layout location={''}>
      <>
        {/* <SEO title={siteTitle}></SEO> */}
        <h1>{toTitleCase(title)}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <p>{date}</p>
        <p>{tags}</p>
      </>
    </Layout>
  );
};

// GraphQL

export const query = graphql`
  query PostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        # featured
        path
        # source
        tags
        title
      }
      html
      # id
    }
  }
`;

export default Post;
