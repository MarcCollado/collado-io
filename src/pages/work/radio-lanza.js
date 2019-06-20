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
      <a className={styles.card__link} href={podcastURL.apple}>
        <Img
          className={styles.image}
          alt="Listen on Apple Podcasts"
          fluid={applePodcasts}
        />
      </a>
      <a className={styles.card__link} href={podcastURL.google}>
        <Img
          className={styles.image}
          alt="Listen on Google Podcasts"
          fluid={googlePodcasts}
        />
      </a>
      <a className={styles.card__link} href={podcastURL.spotify}>
        <Img
          className={styles.image}
          alt="Listen on Spotify"
          fluid={spotifyPodcasts}
        />
      </a>
      <a className={styles.card__link} href={podcastURL.overcast}>
        <Img
          className={styles.image}
          alt="Listen on Overcast"
          fluid={overcastPodcasts}
        />
      </a>
      <div dangerouslySetInnerHTML={{ __html: pageCopy }} />
      <hr />
      <p>
        This side-project — and this page — is currently under development and
        it will be released some time in 2019.
      </p>
      <p>
        Meanwhile you can find out more in the{' '}
        <a href="https://github.com/MarcCollado/pansa">project repository</a>{' '}
        and also below you will find a recollection of posts covering a little
        bit why such a product needs to exist.
      </p>
      {renderRadioLanzaCards('')}
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
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    googlePodcasts: file(relativePath: { eq: "podcast-badge-google.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    spotifyPodcasts: file(relativePath: { eq: "podcast-badge-spotify.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    overcastPodcasts: file(relativePath: { eq: "podcast-badge-overcast.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
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
