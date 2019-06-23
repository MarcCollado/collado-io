import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Podcasts } from '../../components/Podcasts';
// import '../../styles/tabs.css';
import { renderFilteredBlogCards } from '../../utils/helpers';

const radioLanza = ({ data }) => {
  const pageCopy = data.pageCopy.edges[0].node.html;
  const radioLanzaBlogPosts = data.radioLanzaBlogPosts.edges;
  const renderRadioLanzaCards = renderFilteredBlogCards.bind(
    null,
    radioLanzaBlogPosts
  );
  // Get the images from the GraphQL query
  const radioLanzaCover = data.radioLanzaCover.childImageSharp.fluid;

  return (
    <Layout>
      <Header
        tagline="A Podcast w/ Jimmy Flores & Marc Collado"
        title="Radio Lanza"
      />
      <Img className={styles.image} alt="Radio Lanza" fluid={radioLanzaCover} />
      <Podcasts />
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
    radioLanzaCover: file(relativePath: { eq: "radio-lanza-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
  }
`;

radioLanza.propTypes = {
  data: PropTypes.shape({
    radioLanzaCover: PropTypes.object.isRequired,
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
    })
  }).isRequired
};

export default radioLanza;
