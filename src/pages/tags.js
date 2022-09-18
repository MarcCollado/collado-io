import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

const Tags = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Tags`;
  const { group: tags } = data.allMarkdownRemark;
  return (
    <Layout location={location}>
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tags;
