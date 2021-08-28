import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';

const HomePage = ({ data, location }) => {
  const homePageInfo = {
    title: data.homePageInfo.edges[0].node.frontmatter.title,
    excerpt: data.homePageInfo.edges[0].node.frontmatter.excerpt,
    html: data.homePageInfo.edges[0].node.html,
  };
  return (
    <Layout title="Home" description="" pathname={location.pathname}>
      <Header title={homePageInfo.title} tagline={homePageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: homePageInfo.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    homePageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/home.md/" } }
      limit: 1
    ) {
      ...pageInfo
    }
  }
`;

HomePage.propTypes = {
  data: PropTypes.shape({
    homePageInfo: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string,
              excerpt: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default HomePage;
