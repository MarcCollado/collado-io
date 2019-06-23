import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';

const HomePage = ({ data }) => {
  const homeIndexHtml = data.pageCopy.edges[0].node.html;
  const marcPicture = data.marcPicture.childImageSharp.fluid;
  return (
    <Layout>
      <Header title="Marc Collado" tagline="Singularly Curious" />
      <Img
        alt="Marc Collado"
        fluid={marcPicture}
        style={{ width: `15em`, margin: `0 auto -1em` }}
      />
      <div dangerouslySetInnerHTML={{ __html: homeIndexHtml }} />
    </Layout>
  );
};

export const query = graphql`
  {
    marcPicture: file(relativePath: { eq: "marc.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    pageCopy: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(home)/" } }
      limit: 1
    ) {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`;

HomePage.propTypes = {
  data: PropTypes.shape({
    marcPicture: PropTypes.object.isRequired,
    pageCopy: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired
          })
        })
      )
    })
  }).isRequired
};

export default HomePage;
