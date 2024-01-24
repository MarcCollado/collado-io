import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';

const Tags = ({ data, location }) => {
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/media/posts/" } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head = ({ location }) => (
  <Seo
    pageTitle="Tags — Marc Collado"
    pageDescription="Marc's tags"
    location={location}
  />
);

export default Tags;
