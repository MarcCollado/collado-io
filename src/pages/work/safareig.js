import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

// Components
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';

// Utils
import styles from './work.module.css';
import { renderPosts, extractPageInfo } from '../../utils/helpers';

const Safareig = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.fluid;
  const seoImg = data.coverImg.childImageSharp.fluid.src;
  const pageInfo = extractPageInfo(data.safareigPageInfo.edges);
  const safareigPosts = data.safareigPosts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
      image={seoImg}
    >
      <Header title={pageInfo.title} tagline={pageInfo.excerpt} />
      <a target="_blank" rel="noreferrer" href="https://www.safareig.fm">
        <Img
          className={styles.image}
          title={pageInfo.title}
          alt={pageInfo.excerpt}
          fluid={coverImg}
        />
      </a>
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      {renderPosts(safareigPosts)}
    </Layout>
  );
};

export const query = graphql`
  {
    safareigPageInfo: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/pages/safareig.md/" }
      }
    ) {
      ...pageInfo
    }
    safareigPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["safareig"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "safareig-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

Safareig.propTypes = {
  data: PropTypes.shape({
    coverImg: PropTypes.object.isRequired,
    workSafareig: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
    safareigBlogPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              excerpt: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default Safareig;
