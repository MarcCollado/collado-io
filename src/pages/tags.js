import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const Tags = ({ data, location }) => {
  const { group: tags } = data.allMarkdownRemark;
  const seoData = {
    pageDescription: `All tags.`,
    pageTitle: ``,
  };
  return (
    <Layout location={location} seoData={seoData}>
      <ul>
        {tags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${tag.fieldValue}/`}>
              <span itemProp="tag">
                {tag.fieldValue + ' ' + tag.totalCount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
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
      filter: { fileAbsolutePath: { regex: "/src/media/markdown/posts/" } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tags;
