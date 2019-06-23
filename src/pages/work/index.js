import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { WorkCard } from '../../components/WorkCard';

const WorkPage = ({ data }) => {
  const allWorkPosts = data.allMarkdownRemark.edges;
  const workIndex = allWorkPosts
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      title: edge.node.frontmatter.title,
      path: edge.node.frontmatter.path,
      excerpt: edge.node.frontmatter.excerpt,
      html: edge.node.html
    }));
  const renderAllWorkCards = allWorkPosts
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      // Each thumbnail image is fetched inside WorkCard component
      <WorkCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
      />
    ));

  return (
    <Layout
      title={workIndex[0].title}
      description={workIndex[0].excerpt}
      pathname={workIndex[0].path}
    >
      <Header title={workIndex[0].title} tagline="Things I've Done" />
      <div dangerouslySetInnerHTML={{ __html: workIndex[0].html }} />
      <div className={styles.container}>{renderAllWorkCards}</div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/" } }
      limit: 100
    ) {
      ...allWorkPosts
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
