import React from 'react';
import { graphql } from 'gatsby';

import Layout from './layout';
import { renderPosts } from '../utils/helpers';

const TagPage = ({ data, location, pageContext }) => {
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.edges;
  const { tag } = pageContext;
  const TagCount = `💡 ${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  const md = {
    title: `Tag: ${tag}`,
    excerpt: 'Like the blog, but filtered',
  };

  return (
    <Layout
      article={false}
      coverImage={false}
      md={md}
      pathname={location.pathname}
      seoImage={false}
    >
      <p>{TagCount}</p>
      {renderPosts(posts)}
    </Layout>
  );
};

// GraphQL

export const query = graphql`
  query tagPageQuery($tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      ...allPosts
    }
  }
`;

export default TagPage;
