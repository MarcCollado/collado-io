import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

// Components
import Header from '../../components/header';
import Layout from '../../components/layout';
import PostCard from '../../components/postCard';

// Utils
import * as styles from './work.module.css';
import { extractMarkdown } from '../../utils/helpers';
import { workmaps } from '../../utils/workmaps';

const WorkPage = ({ data, location }) => {
  const pageInfo = extractMarkdown(
    data.workPage.edges.filter((edge) => edge.node.frontmatter.title === 'Work')
  );
  const renderWorkCards = data.workPage.edges
    .filter((edge) => edge.node.frontmatter.title in workmaps)
    .map((edge) => {
      const k = edge.node.frontmatter.title;
      const v = workmaps[k];
      const img = data[v].childImageSharp.fluid;
      return (
        <PostCard
          key={edge.node.id}
          image={img}
          title={k}
          path={edge.node.frontmatter.path}
          excerpt={edge.node.frontmatter.excerpt}
        />
      );
    });
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
    >
      <Header title={pageInfo.title} subtitle={pageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      <div className={styles.container}>{renderWorkCards}</div>
    </Layout>
  );
};

export const query = graphql`
  {
    workPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...pageMarkdown
    }
    safareig: file(relativePath: { eq: "logos/safareig.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gamestry: file(relativePath: { eq: "logos/gamestry.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    radioLanza: file(relativePath: { eq: "logos/radio-lanza.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ironhack: file(relativePath: { eq: "logos/ironhack.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    iomando: file(relativePath: { eq: "logos/iomando.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

WorkPage.propTypes = {
  data: PropTypes.shape({
    workPageInfo: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string,
              path: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
    iomando: PropTypes.object.isRequired,
    ironhack: PropTypes.object.isRequired,
    radioLanza: PropTypes.object.isRequired,
    gamestry: PropTypes.object.isRequired,
    safareig: PropTypes.object.isRequired,
  }).isRequired,
};

export default WorkPage;
