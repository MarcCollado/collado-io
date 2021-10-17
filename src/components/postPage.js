import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { fluid } from '../utils/fluid';
import Layout from './layout';
import PostMeta from './postMeta';

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
    margin: ${fluid(32, 40)} 0px;
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
    margin: 0px auto;
  }
`;

// Main Components

const PostPage = ({ data, pageContext }) => {
  // const { frontmatter, html, id } = data.markdownRemark;
  const { frontmatter, html } = data.markdownRemark;
  // const { date, excerpt, featured, path, source, tags, title } = frontmatter;
  const { date, path, tags, title } = frontmatter;
  const next = pageContext.next.frontmatter.path;
  const prev = pageContext.prev.frontmatter.path;

  return (
    <Layout
      article={true}
      coverImage={false}
      md={frontmatter}
      pathname={path}
      seoImage={false}
    >
      <PostTitle>{title}</PostTitle>
      <PostArticle dangerouslySetInnerHTML={{ __html: html }} />
      <PostMeta
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
