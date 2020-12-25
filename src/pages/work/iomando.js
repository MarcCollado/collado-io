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

const iomando = ({ data, location }) => {
  const workIomandoCoverImg = data.workIomandoCoverImg.childImageSharp.fluid;
  const workIomandoSeoImg = data.workIomandoCoverImg.childImageSharp.fluid.src;
  const workIomando = {
    title: data.workIomando.edges[0].node.frontmatter.title,
    excerpt: data.workIomando.edges[0].node.frontmatter.excerpt,
    html: data.workIomando.edges[0].node.html,
  };
  const iomandoBlogPosts = data.iomandoBlogPosts.edges;
  const renderIomandoBlogCards = renderFilteredBlogCards.bind(
    null,
    iomandoBlogPosts
  );
  const workIomandoProductCoverImg =
    data.workIomandoProductCoverImg.childImageSharp.fluid;
  const workIomandoInsightsCoverImg =
    data.workIomandoInsightsCoverImg.childImageSharp.fluid;
  const workIomandoStoriesCoverImg =
    data.workIomandoStoriesCoverImg.childImageSharp.fluid;

  return (
    <Layout
      title={workIomando.title}
      description={workIomando.excerpt}
      pathname={location.pathname}
      image={workIomandoSeoImg}
    >
      <Header title={workIomando.title} tagline={workIomando.excerpt} />
      <Img
        className={styles.image}
        title={workIomando.title}
        alt={workIomando.excerpt}
        fluid={workIomandoCoverImg}
      />
      <div dangerouslySetInnerHTML={{ __html: workIomando.html }} />
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
            alt="All the iomando release notes and product updates."
            fluid={workIomandoProductCoverImg}
          />
          <p>
            Here is a recollection of all the release notes and product updates.
            Right from the very first 1.0, minor .1s, up to the latest 3.0, upon
            which the company was acquired.
          </p>
          {renderIomandoBlogCards('update')}
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
            alt="Recollection of iomando blog posts that uncovers a naive journey of discovery."
            fluid={workIomandoInsightsCoverImg}
          />
          <p>
            Here is a recollection of posts that uncovers a naive journey of
            discovery, trying to convince the opaque, hardware-based
            accessibility management market, that software was the new thing.
          </p>
          {renderIomandoBlogCards('idea')}
        </TabPanel>
        <TabPanel>
          <p>
            {`iomando was also the first company I co-founded, right after graduating from college. Back then I was only 24 and barely knew what a P&L was. Besides developing a great product, iomando has taught me a far more valuable lesson: how to build a sustainable business.`}
          </p>
          <Img
            className={styles.image}
            title="iomando stories"
            alt="Besides developing a great product, iomando has taught me a far more valuable lesson: how to build a sustainable business."
            fluid={workIomandoStoriesCoverImg}
          />
          <p>
            {`Here's a recollection of stories, decisions, but most important, some the lessons learned along the way on how to manage and lead a startup from zero to acquisition.`}
          </p>
          {renderIomandoBlogCards('memoir')}
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export const query = graphql`
  {
    workIomando: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/pages/iomando.md/" } }
      limit: 1
    ) {
      ...pageInfo
    }
    iomandoBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["iomando"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
    workIomandoCoverImg: file(relativePath: { eq: "iomando-cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
          src
        }
      }
    }
    workIomandoProductCoverImg: file(
      relativePath: { eq: "iomando-updates.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    workIomandoInsightsCoverImg: file(
      relativePath: { eq: "iomando-insights.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    workIomandoStoriesCoverImg: file(
      relativePath: { eq: "iomando-stories.jpg" }
    ) {
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
    workIomandoCoverImg: PropTypes.object.isRequired,
    workIomando: PropTypes.shape({
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
    workIomandoProductCoverImg: PropTypes.object.isRequired,
    workIomandoInsightsCoverImg: PropTypes.object.isRequired,
    workIomandoStoriesCoverImg: PropTypes.object.isRequired,
    iomandoBlogPosts: PropTypes.shape({
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
