import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
// import '../../styles/tabs.css';
import { renderBlogCards } from '../../utils/helpers';

const podcastURL = {
  apple: 'https://podcasts.apple.com/es/podcast/radio-lanza/id1468000755',
  spotify: 'https://open.spotify.com/show/3P6zGrc3Mv8yHCKDXZsUQZ',
  google:
    'https://www.google.com/podcasts?feed=aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9sUjBxOVFlTg%3D%3D',
  overcast: 'https://overcast.fm/itunes1468000755/radio-lanza'
};

const radioLanza = ({ data }) => {
  const pageCopy = data.pageCopy.edges[0].node.html;
  const radioLanzaBlogPosts = data.radioLanzaBlogPosts.edges;
  const renderRadioLanzaCards = renderBlogCards.bind(null, radioLanzaBlogPosts);
  // Get the images from the GraphQL query
  const radioLanzaCover = data.radioLanzaCover.childImageSharp.fluid;
  const applePodcasts = data.applePodcasts.childImageSharp.fluid;
  const googlePodcasts = data.googlePodcasts.childImageSharp.fluid;
  const spotifyPodcasts = data.spotifyPodcasts.childImageSharp.fluid;
  const overcastPodcasts = data.overcastPodcasts.childImageSharp.fluid;

  return (
    <Layout>
      <Header
        tagline="A Podcast w/ Jimmy Flores & Marc Collado"
        title="Radio Lanza"
      />
      <Img className={styles.image} alt="Radio Lanza" fluid={radioLanzaCover} />
      <div className={styles.podcast__container}>
        <a href={podcastURL.apple}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Apple Podcasts"
            fluid={applePodcasts}
          />
        </a>
        <a href={podcastURL.google}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Google Podcasts"
            fluid={googlePodcasts}
          />
        </a>
        <a href={podcastURL.spotify}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Spotify"
            fluid={spotifyPodcasts}
          />
        </a>
        <a href={podcastURL.overcast}>
          <Img
            className={styles.podcast__image}
            alt="Listen on Overcast"
            fluid={overcastPodcasts}
          />
        </a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: pageCopy }} />
      <hr />
      <p>
        This work-page is still under development. In the upcoming weeks it will
        feature the list of episodes and show notes below.
      </p>
      <p>
        Meanwhile you can check them out at{' '}
        <a href="https://www.radiolanza.com">the official Radio Lanza page</a>{' '}
        and also below you will find a recollection of posts explaining the
        story behind Radio Lanza.
      </p>
      {renderRadioLanzaCards('update')}
    </Layout>
  );
};

export const query = graphql`
  {
    pageCopy: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/(radio-lanza)/" }
      }
      limit: 1
    ) {
      edges {
        node {
          id
          html
        }
      }
    }
    radioLanzaBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" }
        frontmatter: { tags: { in: ["radio lanza"] } }
      }
      limit: 50
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            path
            tags
            title
          }
        }
      }
    }
    radioLanzaCover: file(relativePath: { eq: "radio-lanza-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    applePodcasts: file(relativePath: { eq: "podcast-badge-apple.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    googlePodcasts: file(relativePath: { eq: "podcast-badge-google.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    spotifyPodcasts: file(relativePath: { eq: "podcast-badge-spotify.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    overcastPodcasts: file(relativePath: { eq: "podcast-badge-overcast.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

radioLanza.propTypes = {
  data: PropTypes.shape({
    pageCopy: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired
          })
        })
      )
    }),
    radioLanzaBlogPosts: PropTypes.shape({
      totalCount: PropTypes.number,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              date: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              title: PropTypes.string.isRequired
            })
          })
        })
      )
    }),
    radioLanzaCover: PropTypes.object.isRequired,
    applePodcasts: PropTypes.object.isRequired,
    googlePodcasts: PropTypes.object.isRequired,
    spotifyPodcasts: PropTypes.object.isRequired,
    overcastPodcasts: PropTypes.object.isRequired
  }).isRequired
};

export default radioLanza;
