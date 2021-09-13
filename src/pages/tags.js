import React from 'react';
import { Link, graphql } from 'gatsby';

import Layoutt from '../components/layoutt';
import { extractMarkdown } from '../utils/helpers';

const TagsPage = ({ data, location }) => {
  const md = extractMarkdown(data.md.edges);
  const { group } = data.tags;

  return (
    <Layoutt
      article={false}
      coverImage={false}
      md={md}
      pathname={location.pathname}
      seoImage={false}
    >
      <ul>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${tag.fieldValue}/`}>
              {`${tag.fieldValue} (${tag.totalCount})`}
            </Link>
          </li>
        ))}
      </ul>
    </Layoutt>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/tags.md/" } }
      limit: 1
    ) {
      ...pageMarkdown
    }
    tags: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/posts/" } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage;
