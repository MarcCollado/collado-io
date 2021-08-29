import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

// Components
import Header from '../../components/header';
import Layout from '../../components/layout';

// Utils
import * as styles from './work.module.css';
import { renderPosts, extractMarkdown } from '../../utils/helpers';

const Gamestry = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.fluid;
  const seoImg = data.coverImg.childImageSharp.fluid.src;
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
      <Img
        className={styles.image}
        title={pageInfo.title}
        alt={pageInfo.excerpt}
        fluid={coverImg}
      />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      {renderPosts(posts)}
    </Layout>
  );
};

export const query = graphql`
  {
    pageInfo: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/pages/gamestry.md/" }
      }
    ) {
      ...pageMarkdown
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: ["gamestry"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "pages/gamestry-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Gamestry;
