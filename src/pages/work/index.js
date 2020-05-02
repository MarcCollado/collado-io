import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { BlogCard } from '../../components/BlogCard';

// Helper that returns the matching graphQL query for each title
const titleTranslator = {
  iomando: 'iomando',
  Ironhack: 'ironhack',
  'Radio Lanza': 'radioLanza',
  Gamestry: 'gamestry',
};

const WorkPage = ({ data, location }) => {
  // get the GQL data pulled from md/work files
  const pageInfo = data.workPageInfo.edges;
  // get the content of the /work page itself (does not have 'date' field)
  const workIndex = pageInfo
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      title: edge.node.frontmatter.title,
      path: edge.node.frontmatter.path,
      excerpt: edge.node.frontmatter.excerpt,
      html: edge.node.html,
    }));
  // render work Cards from the mds that do have 'date' field
  const renderAllWorkCards = pageInfo
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => {
      const title = edge.node.frontmatter.title;
      const titleValue = titleTranslator[title];
      const cardImage = data[titleValue].childImageSharp.fluid;
      return (
        <BlogCard
          key={edge.node.id}
          image={cardImage}
          title={title}
          path={edge.node.frontmatter.path}
          excerpt={edge.node.frontmatter.excerpt}
        />
      );
    });
  return (
    <Layout
      title={workIndex[0].title}
      description={workIndex[0].excerpt}
      pathname={location.pathname}
    >
      <Header title={workIndex[0].title} tagline={workIndex[0].excerpt} />
      <div dangerouslySetInnerHTML={{ __html: workIndex[0].html }} />
      <div className={styles.container}>{renderAllWorkCards}</div>
    </Layout>
  );
};

export const query = graphql`
  {
    workPageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/" } }
      limit: 100
    ) {
      ...pageInfo
    }
    gamestry: file(relativePath: { eq: "gamestry.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    radioLanza: file(relativePath: { eq: "radio-lanza.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ironhack: file(relativePath: { eq: "ironhack.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    iomando: file(relativePath: { eq: "iomando.png" }) {
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
  }).isRequired,
};

export default WorkPage;
