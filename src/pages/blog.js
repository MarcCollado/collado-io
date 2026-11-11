import * as React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import { blogFeedGenerator } from '../utils/helpers';

const Blog = ({ data }) => (
  <>
    <h1 className="visually-hidden">Blog</h1>
    {blogFeedGenerator(data)}
  </>
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
