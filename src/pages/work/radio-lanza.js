import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
// import PropTypes from 'prop-types';

// Components
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';

// Utils
import styles from './work.module.css';
import { renderPosts, extractPageInfo } from '../../utils/helpers';

const RadioLanza = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.fluid;
  const seoImg = data.coverImg.childImageSharp.fluid.src;
  const pageInfo = extractPageInfo(data.pageInfo.edges);
  const posts = data.posts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
      image={seoImg}
    >
      <Header title={pageInfo.title} tagline={pageInfo.excerpt} />
      <a target="_blank" rel="noreferrer" href="https://www.radiolanza.com">
        <Img
          className={styles.image}
          title={pageInfo.title}
          alt={pageInfo.excerpt}
          fluid={coverImg}
        />
      </a>
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      {renderPosts(posts)}
    </Layout>
  );
};

export const query = graphql`
  {
    pageInfo: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/pages/radio-lanza.md/" }
      }
    ) {
      ...pageInfo
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["radio lanza"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "pages/radio-lanza-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default RadioLanza;
