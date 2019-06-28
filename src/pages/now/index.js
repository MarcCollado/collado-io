import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { NowCard } from '../../components/NowCard';

const NowPage = ({ data }) => {
  const allNowPosts = data.allMarkdownRemark.edges;
  const nowIndex = allNowPosts
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      title: edge.node.frontmatter.title,
      path: edge.node.frontmatter.path,
      excerpt: edge.node.frontmatter.excerpt,
      html: edge.node.html
    }));
  const renderAllNowCards = allNowPosts
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <NowCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        html={edge.node.html}
      />
    ));

  return (
    <Layout
      title={nowIndex[0].title}
      description={nowIndex[0].excerpt}
      pathname={nowIndex[0].path}
    >
      <Header title={nowIndex[0].title} tagline="Things I'm Doing" />
      <div dangerouslySetInnerHTML={{ __html: nowIndex[0].html }} />
      {renderAllNowCards}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(now)/" } }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allWorkPosts
    }
  }
`;

NowPage.propTypes = {
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

NowPage.defaultProps = {
  // TODO: add defaultProps
};

export default NowPage;
