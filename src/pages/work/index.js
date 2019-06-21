import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { WorkCard } from '../../components/WorkCard';

const WorkPage = ({ data }) => {
  const WorkData = data.allMarkdownRemark.edges;
  const WorkSEO = WorkData
    // Get index.md from ".../markdown/work/"
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      title: edge.node.frontmatter.title,
      path: edge.node.frontmatter.path,
      excerpt: edge.node.frontmatter.excerpt
    }));
  const WorkIntro = WorkData
    // Get index.md from ".../markdown/work/"
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => edge.node.html);
  const renderCards = WorkData
    // Get *.md files with frontmatter date from ".../markdown/work/"
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      // Generate feed of WorkCards
      // The thumbnail image is fetched inside the WorkCard component
      <WorkCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
      />
    ));

  return (
    <Layout
      title={WorkSEO[0].title}
      description={WorkSEO[0].excerpt}
      pathname={WorkSEO[0].path}
    >
      <Header tagline="Things I've Done" title="Work" />
      <div dangerouslySetInnerHTML={{ __html: WorkIntro }} />
      <div className={styles.container}>{renderCards}</div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/" } }
      limit: 10
    ) {
      ...WorkData
    }
  }
`;

WorkPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string,
              path: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

WorkPage.defaultProps = {
  // TODO: add defaultProps
};

export default WorkPage;
