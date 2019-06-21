import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './EpisodePost.module.css';
import { Layout } from '../Layout';
import { PublishedAt } from '../PublishedAt';
import { Tag } from '../Tag';

const EpisodePost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, date, path, tags, excerpt, webURL, iTunesURL } = frontmatter;

  return (
    <Layout>
      <h1>Hello</h1>
    </Layout>
  );
};

export const query = graphql`
  query blogPostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
        webURL
        iTunesURL
      }
    }
  }
`;

EpisodePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        excerpt: PropTypes.string.isRequired,
        webURL: PropTypes.string.isRequired,
        iTunesURL: PropTypes.string.isRequired
      })
    })
  }).isRequired
};

export default EpisodePost;
