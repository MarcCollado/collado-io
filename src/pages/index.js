import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';

const HomePage = ({ data }) => {
  const homeCoverImg = data.homeCoverImg.childImageSharp.fluid;
  const homeIndex = {
    title: data.homeIndex.edges[0].node.frontmatter.title,
    excerpt: data.homeIndex.edges[0].node.frontmatter.excerpt,
    html: data.homeIndex.edges[0].node.html
  };
  return (
    <Layout>
      <Header title={homeIndex.title} tagline={homeIndex.excerpt} />
      <Img
        alt={homeIndex.title}
        fluid={homeCoverImg}
        style={{ width: `15em`, margin: `0 auto -1em` }}
      />
      <div dangerouslySetInnerHTML={{ __html: homeIndex.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    homeCoverImg: file(relativePath: { eq: "marc.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    homeIndex: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(home)/" } }
      limit: 1
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            excerpt
          }
        }
      }
    }
  }
`;

HomePage.propTypes = {
  data: PropTypes.shape({
    homeCoverImg: PropTypes.object.isRequired,
    homeIndex: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default HomePage;
