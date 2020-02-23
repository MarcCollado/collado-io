import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';

const TechPage = ({ data, location }) => {
  const techPageInfo = {
    title: data.techPageInfo.edges[0].node.frontmatter.title,
    excerpt: data.techPageInfo.edges[0].node.frontmatter.excerpt,
    html: data.techPageInfo.edges[0].node.html
  };
  return (
    <Layout title="Tech" description="" pathname={location.pathname}>
      <Header title={techPageInfo.title} tagline={techPageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: techPageInfo.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    techPageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(tech)/" } }
      limit: 1
    ) {
      ...pageInfo
    }
  }
`;

TechPage.propTypes = {
  data: PropTypes.shape({
    techPageImg: PropTypes.object,
    techPageInfo: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string,
              excerpt: PropTypes.string
            })
          })
        })
      )
    })
  }).isRequired
};

export default TechPage;
