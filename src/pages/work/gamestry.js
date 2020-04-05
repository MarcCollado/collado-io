import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import styles from './work.module.css';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import '../../styles/tabs.css';
import { renderFilteredBlogCards } from '../../utils/helpers';

const Gamestry = ({ data, location }) => {
  const workGamestryCoverImg = data.workGamestryCoverImg.childImageSharp.fluid;
  const workGamestrySeoImg =
    data.workGamestryCoverImg.childImageSharp.fluid.src;
  const workGamestry = {
    title: data.workGamestry.edges[0].node.frontmatter.title,
    excerpt: data.workGamestry.edges[0].node.frontmatter.excerpt,
    html: data.workGamestry.edges[0].node.html
  };
  const gamestryBlogPosts = data.gamestryBlogPosts.edges;
  const renderGamestryBlogCards = renderFilteredBlogCards.bind(
    null,
    GamestryBlogPosts
  );
  const workGamestryInsightsCoverImg =
    data.workGamestryInsightsCoverImg.childImageSharp.fluid;
  const workGamestryStoriesCoverImg =
    data.workGamestryStoriesCoverImg.childImageSharp.fluid;

  return (
    <Layout
      title={workGamestry.title}
      description={workGamestry.excerpt}
      pathname={location.pathname}
      image={workGamestrySeoImg}
    >
      <Header title={workGamestry.title} tagline={workGamestry.excerpt} />
      <Img
        className={styles.image}
        title={workGamestry.title}
        alt={workGamestry.excerpt}
        fluid={workGamestryCoverImg}
      />
      <div dangerouslySetInnerHTML={{ __html: workGamestry.html }} />
      <Tabs>
        <TabList>
          <Tab>
            <p>Product releases</p>
          </Tab>
          <Tab>
            <p>Gamestry stories</p>
          </Tab>
        </TabList>

        <TabPanel>
          <p>Lorem... Product releases...</p>
          <Img
            className={styles.image}
            title="Product releases"
            alt="Gamestry is..."
            fluid={workGamestryInsightsCoverImg}
          />
          <p>Lorem... Product releases...</p>
          {renderGamestryBlogCards('update')}
        </TabPanel>
        <TabPanel>
          <p>Lorem... Stories...</p>
          <Img
            className={styles.image}
            title="Gamestry stories"
            alt="Lorem... Stories..."
            fluid={workGamestryStoriesCoverImg}
          />
          <p>Lorem... Stories...</p>
          {renderGamestryBlogCards('memoir')}
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const query = graphql`
  {
    workGamestryCoverImg: file(relativePath: { eq: "gamestry-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
          src
        }
      }
    }
    workGamestry: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(work)/(gamestry)/" }
      }
      limit: 1
    ) {
      ...pageInfo
    }
    workGamestryProductCoverImg: file(
      relativePath: { eq: "gamestry-updates.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    workGamestryStoriesCoverImg: file(
      relativePath: { eq: "gamestry-stories.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    gamestryBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" }
        frontmatter: { tags: { in: ["gamestry"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
  }
`;

Gamestry.propTypes = {
  data: PropTypes.shape({
    workGamestryCoverImg: PropTypes.object.isRequired,
    workGamestry: PropTypes.shape({
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
    }),
    workGamestryProductCoverImg: PropTypes.object.isRequired,
    workGamestryStoriesCoverImg: PropTypes.object.isRequired,
    gamestryBlogPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              excerpt: PropTypes.string.isRequired
            })
          })
        })
      )
    })
  }).isRequired
};

export default Gamestry;
