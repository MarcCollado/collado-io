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

const radioLanza = ({ data }) => {
  const pageCopy = data.pageCopy.edges[0].node.html;
  const radioLanzaBlogPosts = data.radioLanzaBlogPosts.edges;
  const renderRadioLanzaCards = renderBlogCards.bind(null, radioLanzaBlogPosts);
  // Get the images from the GraphQL query
  const radioLanzaCover = data.radioLanzaCover.childImageSharp.fluid;

  return (
    <Layout>
      <Header
        tagline="A Podcast w/ Jimmy Flores & Marc Collado"
        title="Radio Lanza"
      />
      <Img className={styles.image} alt="Radio Lanza" fluid={radioLanzaCover} />
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
    radioLanzaCover: PropTypes.object.isRequired
  }).isRequired
};

export default radioLanza;
