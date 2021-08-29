import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import BlogPostMeta from './BlogPostMeta/BlogPostMeta';
import { Layout } from './Layout';

// Styled Components

const PostTitle = styled.h1`
  font-size: 1.5em;

  @media (min-width: 768px) {
    font-size: 1.75em;
  }
`;

const PostArticle = styled.div`
  *:first-child {
    margin-block-start: 0.5em;
  }

  hr {
    margin: 2em 0;
  }

  div > hr {
    display: none;
  }

  div > ol > li > a:hover,
  div > ol > li > a:hover {
    background: none;
    color: var(--bianchiGreen);
  }

  // Center GIFs
  p > img {
    display: block;
    margin: 0 auto;
  }
`;

// Main Components

const PostPage = ({ data, pageContext }) => {
  // const { frontmatter, html, id } = data.markdownRemark;
  const { frontmatter, html } = data.markdownRemark;
  // const { date, excerpt, featured, path, source, tags, title } = frontmatter;
  const { date, excerpt, path, tags, title } = frontmatter;
  const next = pageContext.next.frontmatter.path;
  const prev = pageContext.prev.frontmatter.path;

  return (
    <Layout
      article={true}
      description={excerpt}
      image={null}
      pathname={path}
      title={title}
    >
      <PostTitle>{title}</PostTitle>
      <PostArticle dangerouslySetInnerHTML={{ __html: html }} />
      <BlogPostMeta
        date={date}
        next={next === path ? null : next}
        prev={prev === path ? null : prev}
        tags={tags}
      />
    </Layout>
  );
};

// GraphQL

export const query = graphql`
  query PostPageQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        featured
        path
        source
        tags
        title
      }
      html
      id
    }
  }
`;

export default PostPage;
