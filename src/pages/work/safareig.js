import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';

import styles from './work.module.css';
import { renderFilteredBlogCards } from '../../utils/helpers';

const Safareig = ({ data, location }) => {
  const workSafareigCoverImg = data.workSafareigCoverImg.childImageSharp.fluid;
  const workSafareigSeoImg =
    data.workSafareigCoverImg.childImageSharp.fluid.src;
  const workSafareig = {
    title: data.workSafareig.edges[0].node.frontmatter.title,
    excerpt: data.workSafareig.edges[0].node.frontmatter.excerpt,
    html: data.workSafareig.edges[0].node.html,
  };
  const safareigBlogPosts = data.safareigBlogPosts.edges;

  return (
    <Layout
      title={workSafareig.title}
      description={workSafareig.excerpt}
      pathname={location.pathname}
      image={workSafareigSeoImg}
    >
      <Header title={workSafareig.title} tagline={workSafareig.excerpt} />
      <a target="_blank" rel="noreferrer" href="https://www.safareig.fm">
        <Img
          className={styles.image}
          title={workSafareig.title}
          alt={workSafareig.excerpt}
          fluid={workSafareigCoverImg}
        />
      </a>
      <div dangerouslySetInnerHTML={{ __html: workSafareig.html }} />
      <h2>(Encara) més sobre Safareig</h2>
      {renderFilteredBlogCards(safareigBlogPosts, 'safareig')}
    </Layout>
  );
};

export const query = graphql`
  {
    workSafareig: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/pages/safareig.md/" }
      }
      limit: 1
    ) {
      ...pageInfo
    }
    safareigBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["safareig"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
    workSafareigCoverImg: file(relativePath: { eq: "safareig-cover.jpg" }) {
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
    workSafareigCoverImg: PropTypes.object.isRequired,
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
