import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './BlogPost.module.css';
import { Layout } from '../Layout';
import BlogPostMeta from '../BlogPostMeta/BlogPostMeta';

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, date, path, tags, excerpt } = frontmatter;
  const nextBlogPostPath = pageContext.next.frontmatter.path;
  const prevBlogPostPath = pageContext.prev.frontmatter.path;

  return (
    <Layout title={title} description={excerpt} pathname={path} article="true">
      <h1 className={styles.title}>{title}</h1>
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <BlogPostMeta
        date={date}
        tags={tags}
        next={nextBlogPostPath === path ? null : nextBlogPostPath}
        prev={prevBlogPostPath === path ? null : prevBlogPostPath}
      />
    </Layout>
  );
};

export const query = graphql`
  query blogPostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        featured
        excerpt
        source
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        path: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        featured: PropTypes.string,
        excerpt: PropTypes.string,
        source: PropTypes.string
      })
    })
  }).isRequired
};

export default BlogPost;
