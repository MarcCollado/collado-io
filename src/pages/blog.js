import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { blogFeedGenerator } from '../utils/helpers';

const Blog = ({ data, location }) => {
  const seoData = {
    pageDescription: `All blog posts.`,
    pageTitle: `Blog`,
  };

  return (
    <Layout location={location} seoData={seoData}>
      <ol style={{ listStyle: `none` }}>{blogFeedGenerator(data)}</ol>
    </Layout>
  );
};

export const postsQuery = graphql`
  query {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
        frontmatter: { tags: { nin: ["drafts"] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...allPosts
    }
    bugadaPosts: allFeedBugada(sort: { isoDate: DESC }) {
      ...allBugadaPosts
    }
  }
`;

export default Blog;
