import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { blogFeedGenerator } from '../utils/helpers';

const Blog = ({ data, location }) => (
  <Layout location={location}>
    <h1 className="visually-hidden">Blog</h1>
    <ol style={{ listStyle: `none` }}>{blogFeedGenerator(data)}</ol>
  </Layout>
);

export const allBlogPostsQuery = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/media/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...allBlogPosts
    }
    bugadaPosts: allFeedBugada(sort: { isoDate: DESC }) {
      ...allBugadaPosts
    }
  }
`;

export const Head = ({ location }) => (
  <Seo
    pageTitle="Blog"
    pageDescription="Marc's blog posts"
    location={location}
  />
);

export default Blog;
