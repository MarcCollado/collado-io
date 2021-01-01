import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

// Components
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';

// Utils
import '../../styles/tabs.css';
import styles from './work.module.css';
import { renderPosts, extractPageInfo } from '../../utils/helpers';

const iomando = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.fluid;
  const seoImg = data.coverImg.childImageSharp.fluid.src;
  const productImg = data.productImg.childImageSharp.fluid;
  const insightsImg = data.insightsImg.childImageSharp.fluid;
  const storiesImg = data.storiesImg.childImageSharp.fluid;
  const pageInfo = extractPageInfo(data.pageInfo.edges);
  const posts = data.posts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
      image={seoImg}
    >
      <Header title={pageInfo.title} tagline={pageInfo.excerpt} />
      <Img
        className={styles.image}
        title={pageInfo.title}
        alt={pageInfo.excerpt}
        fluid={coverImg}
      />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      <Tabs>
        <TabList>
          <Tab>
            <p>Product releases</p>
          </Tab>
          <Tab>
            <p>Industry insights</p>
          </Tab>
          <Tab>
            <p>iomando stories</p>
          </Tab>
        </TabList>

        <TabPanel>
          <p>
            {`At iomando, we cared about our product and our users' experience
            beyond what most would consider unreasonable. Even in the early
            days, we understood that investing in having the best product would
            eventually become a unique asset and the enabler of a thriving
            business.`}
          </p>
          <Img
            className={styles.image}
            title="iomando updates"
            alt="iomando release notes and product updates."
            fluid={productImg}
          />
          <p>
            Here is a recollection of all the release notes and product updates.
            Right from the very first 1.0, minor .1s, up to the latest 3.0, upon
            which the company was acquired.
          </p>
          {renderPosts(posts, 'update')}
        </TabPanel>
        <TabPanel>
          <p>
            Great products arise around user pains. Curiously, iomando was —
            unintentionally — designed the other way around. We built a really
            cool product, but all of a sudden, we found ourselves with an
            amazing piece of technology in the midst of a market we knew nothing
            about.
          </p>
          <Img
            className={styles.image}
            title="iomando insights"
            alt="iomando posts that uncover a naive journey of discovery."
            fluid={insightsImg}
          />
          <p>
            Here is a recollection of posts that uncovers a naive journey of
            discovery, trying to convince the opaque, hardware-based
            accessibility management market, that software was the new thing.
          </p>
          {renderPosts(posts, 'idea')}
        </TabPanel>
        <TabPanel>
          <p>
            {`iomando was also the first company I co-founded, right after graduating from college. Back then I was only 24 and barely knew what a P&L was. Besides developing a great product, iomando has taught me a far more valuable lesson: how to build a sustainable business.`}
          </p>
          <Img
            className={styles.image}
            title="iomando stories"
            alt="iomando has taught me a valuable lesson: how to build a sustainable business."
            fluid={storiesImg}
          />
          <p>
            {`Here's a recollection of stories, decisions, but most important, some the lessons learned along the way on how to manage and lead a startup from zero to acquisition.`}
          </p>
          {renderPosts(posts, 'memoir')}
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const query = graphql`
  {
    pageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/pages/iomando.md/" } }
    ) {
      ...pageInfo
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["iomando"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "iomando-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    productImg: file(relativePath: { eq: "iomando-updates.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    insightsImg: file(relativePath: { eq: "iomando-insights.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    storiesImg: file(relativePath: { eq: "iomando-stories.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

iomando.propTypes = {
  data: PropTypes.shape({
    coverImg: PropTypes.object.isRequired,
    productImg: PropTypes.object.isRequired,
    insightsImg: PropTypes.object.isRequired,
    storiesImg: PropTypes.object.isRequired,
    pageInfo: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              excerpt: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              path: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
              excerpt: PropTypes.string.isRequired,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default iomando;
