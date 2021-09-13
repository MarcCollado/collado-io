import React from 'react';
import { graphql } from 'gatsby';

import Layoutt from '../components/layoutt';
import { renderPosts, extractMarkdown } from '../utils/helpers';

const BlogPage = ({ data, location }) => {
  const md = extractMarkdown(data.md.edges);
  const posts = data.posts.edges;

  return (
    <Layoutt
      article={false}
      coverImage={false}
      md={md}
      pathname={location.pathname}
      seoImage={false}
    >
      {renderPosts(posts)}
    </Layoutt>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/blog.md/" } }
      limit: 1
    ) {
      ...pageMarkdown
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { nin: ["books", "now"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
  }
`;

export default BlogPage;
