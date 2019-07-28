import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { PublishedAt } from '../../components/PublishedAt';

const ChangeLogPage = ({ data }) => {
  const allReleaseNotes = data.allMarkdownRemark.edges;
  const releaseNotesIndex = allReleaseNotes
    .filter((edge) => edge.node.frontmatter.date === null)
    .map((edge) => ({
      title: edge.node.frontmatter.title,
      excerpt: edge.node.frontmatter.excerpt
    }));
  const renderAllReleaseNotes = allReleaseNotes
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <>
        <h2>{edge.node.frontmatter.title}</h2>
        <PublishedAt date={edge.node.frontmatter.date} />
        <p>{edge.node.frontmatter.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
      </>
    ));
  return (
    <Layout
      title={releaseNotesIndex[0].title}
      description={releaseNotesIndex[0].excerpt}
    >
      <Header
        title={releaseNotesIndex[0].title}
        tagline={releaseNotesIndex[0].excerpt}
      />
      {renderAllReleaseNotes}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(release-notes)/" }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            excerpt
          }
        }
      }
    }
  }
`;

ChangeLogPage.propTypes = {
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
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default ChangeLogPage;
