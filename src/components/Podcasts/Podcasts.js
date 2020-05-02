import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styles from './Podcasts.module.css';

const podcastsURLs = {
  apple: 'https://podcasts.apple.com/es/podcast/radio-lanza/id1468000755',
  spotify: 'https://open.spotify.com/show/3P6zGrc3Mv8yHCKDXZsUQZ',
  google:
    'https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9sUjBxOVFlTg%3D%3D',
  overcast: 'https://overcast.fm/itunes1468000755/radio-lanza',
};

const Podcasts = ({ data }) => {
  const applePodcasts = data.applePodcasts.childImageSharp.fluid;
  const googlePodcasts = data.googlePodcasts.childImageSharp.fluid;
  const spotifyPodcasts = data.spotifyPodcasts.childImageSharp.fluid;
  const overcastPodcasts = data.overcastPodcasts.childImageSharp.fluid;
  return (
    <div className={styles.card}>
      <div className={styles.podcast__container}>
        <a href={podcastsURLs.apple}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Apple Podcasts"
            fluid={applePodcasts}
          />
        </a>
        <a href={podcastsURLs.google}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Google Podcasts"
            fluid={googlePodcasts}
          />
        </a>
        <a href={podcastsURLs.spotify}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Spotify"
            fluid={spotifyPodcasts}
          />
        </a>
        <a href={podcastsURLs.overcast}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Overcast"
            fluid={overcastPodcasts}
          />
        </a>
      </div>
    </div>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query PodcastsQuery {
        applePodcasts: file(
          relativePath: { eq: "podcasts/podcast-badge-apple.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        googlePodcasts: file(
          relativePath: { eq: "podcasts/podcast-badge-google.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        spotifyPodcasts: file(
          relativePath: { eq: "podcasts/podcast-badge-spotify.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        overcastPodcasts: file(
          relativePath: { eq: "podcasts/podcast-badge-overcast.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => <Podcasts data={data} {...props} />}
  />
);

Podcasts.propTypes = {
  data: PropTypes.shape({
    applePodcasts: PropTypes.object.isRequired,
    googlePodcasts: PropTypes.object.isRequired,
    spotifyPodcasts: PropTypes.object.isRequired,
    overcastPodcasts: PropTypes.object.isRequired,
  }).isRequired,
};
