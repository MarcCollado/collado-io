import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { createFeed } from '../utils/helpers';

const Blog = ({ data, location }) => {
  const seoData = {
    pageDescription: `All blog posts.`,
    pageTitle: ``,
  };

  return (
    <Layout location={location} seoData={seoData}>
      <ol style={{ listStyle: `none` }}>{createFeed(data)}</ol>
    </Layout>
  );
};

export const blogQuery = graphql`
  query {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
        frontmatter: { tags: { nin: ["drafts", "now"] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...allPosts
    }
    safareigEpisodes: allFeedSafareig(sort: { isoDate: DESC }) {
      ...allSafareigEpisodes
    }
    fatEpisodes: allFeedFocATerra(sort: { isoDate: DESC }) {
      ...allFocATerraEpisodes
    }
  }
`;

export default Blog;
