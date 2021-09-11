import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
// import PropTypes from 'prop-types';

// Components
import Header from '../../components/header';
import Layout from '../../components/layout';

// Utils
import * as styles from './work.module.css';
import { renderPosts, extractMarkdown } from '../../utils/helpers';

const Safareig = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.gatsbyImageData;
  const seoImg = data.coverImg.childImageSharp.gatsbyImageData.src;
  const pageInfo = extractMarkdown(data.pageInfo.edges);
  const posts = data.posts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
      image={seoImg}
    >
      <Header title={pageInfo.title} subtitle={pageInfo.excerpt} />
      <a target="_blank" rel="noreferrer" href="https://www.safareig.fm">
        <GatsbyImage
          image={coverImg}
          className={styles.image}
          title={pageInfo.title}
          alt={pageInfo.excerpt}
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
        fileAbsolutePath: { regex: "/src/content/md/pages/safareig.md/" }
      }
    ) {
      ...pageMarkdown
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: ["safareig"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "pages/safareig-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
  }
`;

export default Safareig;
