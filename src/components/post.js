import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BlogPostMeta from '../components/BlogPostMeta/BlogPostMeta';
import { Layout } from '../components/Layout';

// Styled Components

const PostTitle = styled.h1`
  margin: 0.25em 0;
`;

const PostArticle = styled.div`
  hr {
    margin: 1.5em 0;
  }

  div > hr {
    display: none;
  }

  div > ol > li > a:hover,
  div > ol > li > a:hover {
    background: none;
    color: var(--bianchiGreen);
  }

  // Images & GIFs
  p > img {
    display: block;
    margin: 0 auto;
  }
`;

// Main Components

const PostPage = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { date, excerpt, path, tags, title } = frontmatter;
  const nextPostPath = pageContext.next.frontmatter.path;
  const prevPostPath = pageContext.prev.frontmatter.path;

  return (
    <Layout article={true} description={excerpt} pathname={path} title={title}>
      <PostTitle>{title}</PostTitle>
      <PostArticle dangerouslySetInnerHTML={{ __html: html }} />
      <BlogPostMeta
        date={date}
        next={nextPostPath === path ? null : nextPostPath}
        prev={prevPostPath === path ? null : prevPostPath}
        tags={tags}
      />
    </Layout>
  );
};

// GraphQL

export const query = graphql`
  query PostPageQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        featured
        path
        source
        title
        tags
      }
      html
    }
  }
`;

// prop-types

PostPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        excerpt: PropTypes.string,
        featured: PropTypes.string,
        path: PropTypes.string,
        source: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
      }),
      html: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  pageContext: PropTypes.shape({
    next: PropTypes.shape(),
    prev: PropTypes.shape(),
  }),
};

export default PostPage;
