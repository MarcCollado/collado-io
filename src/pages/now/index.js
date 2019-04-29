import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { NowCard } from '../../components/NowCard';

const NowPage = ({ data }) => {
  const NowData = data.allMarkdownRemark.edges;
  const NowSEO = NowData
    // Get md files with the frontmatter date set to null (index.md)
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      path: edge.node.frontmatter.path,
      title: edge.node.frontmatter.title,
      excerpt: edge.node.frontmatter.excerpt
    }));
  const NowIntro = NowData
    // Get (again) md files with the frontmatter date set to null (index.md)
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => edge.node.html);
  const renderCards = NowData
    // Get md files with frontmatter date data set
    .filter((edge) => !!edge.node.frontmatter.date)
    // Generate a feed of NowPosts
    .map((edge) => (
      <NowCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        html={edge.node.html}
        date={edge.node.frontmatter.date}
      />
    ));

  return (
    <Layout
      title={NowSEO[0].title}
      description={NowSEO[0].excerpt}
      pathname={NowSEO[0].path}
    >
      <Header tagline="Things I'm Doing" title="Now" />
      <div dangerouslySetInnerHTML={{ __html: NowIntro }} />
      {renderCards}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(now)/" } }
      limit: 50
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            excerpt
            path
          }
        }
      }
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
              date: PropTypes.string,
              title: PropTypes.string.isRequired,
              excerpt: PropTypes.string,
              path: PropTypes.string
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
