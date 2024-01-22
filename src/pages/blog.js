import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { blogFeedGenerator } from '../utils/helpers';

const Blog = ({ data, location }) => {
  return (
    <Layout location={location}>
      <ol style={{ listStyle: `none` }}>{blogFeedGenerator(data)}</ol>
    </Layout>
  );
};

export const allBlogPostsQuery = graphql`
  query {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/posts/" }
        frontmatter: { tags: { nin: ["drafts"] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...allBlogPosts
    }
    bugadaPosts: allFeedBugada(sort: { isoDate: DESC }) {
      ...allBugadaPosts
    }
  }
`;

export const Head = ({ location }) => {
  return (
    <SEO
      pageTitle="Marc's Blog"
      pageDescription="All Marc's blog posts"
      location={location}
    />
  );
};

export default Blog;
