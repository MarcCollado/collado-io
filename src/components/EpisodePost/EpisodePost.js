import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import * as styles from './EpisodePost.module.css';
import Layout from '../layout';
import { PublishedAt } from '../PublishedAt';

const EpisodePost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, date, path, excerpt, show, playerURL } = frontmatter;

  return (
    <Layout title={title} description={`${show} — ${excerpt}`} pathname={path}>
      <h1 className={styles.title}>The show notes</h1>
      <iframe
        className={styles.player}
        title={title}
        frameBorder="no"
        scrolling="no"
        seamless
        src={`https://player.simplecast.com/${playerURL}?dark=false`}
      />
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <hr />
      <div className={styles.meta}>
        <div className={styles.meta__date}>
          <PublishedAt date={date} />
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query episodePostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        featured
        excerpt
        show
        episode
        episodeURL
        playerURL
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
        show: PropTypes.string.isRequired,
        episodeURL: PropTypes.string.isRequired,
        playerURL: PropTypes.string.isRequired,
        iTunesURL: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default EpisodePost;
