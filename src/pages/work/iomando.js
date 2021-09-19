import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import Layout from '../../components/layout';
import { renderPosts, extractMarkdown } from '../../utils/helpers';
import '../../styles/tabs.css';

const CoverImage = styled(GatsbyImage)`
  margin: 1em 0em 0.5em;
`;

const iomando = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.gatsbyImageData;
  const seoImg = data.coverImg.childImageSharp.gatsbyImageData.src;
  const productImg = data.productImg.childImageSharp.gatsbyImageData;
  const insightsImg = data.insightsImg.childImageSharp.gatsbyImageData;
  const storiesImg = data.storiesImg.childImageSharp.gatsbyImageData;
  const md = extractMarkdown(data.md.edges);
  const posts = data.posts.edges;

  return (
    <Layout
      article={false}
      coverImage={coverImg}
      md={md}
      pathname={location.pathname}
      seoImage={seoImg}
    >
      <Tabs>
        <TabList>
          <Tab>
            <p>Releases</p>
          </Tab>
          <Tab>
            <p>Insights</p>
          </Tab>
          <Tab>
            <p>Stories</p>
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
          <CoverImage
            image={productImg}
            title="iomando updates"
            alt="iomando release notes and product updates."
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
          <CoverImage
            image={insightsImg}
            title="iomando insights"
            alt="iomando posts that uncover a naive journey of discovery."
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
          <CoverImage
            image={storiesImg}
            title="iomando stories"
            alt="iomando has taught me a valuable lesson: how to build a sustainable business."
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
    md: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/pages/iomando.md/" }
      }
      limit: 1
    ) {
      ...pageMarkdown
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: ["iomando"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "pages/iomando-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    productImg: file(relativePath: { eq: "pages/iomando-updates.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    insightsImg: file(relativePath: { eq: "pages/iomando-insights.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    storiesImg: file(relativePath: { eq: "pages/iomando-stories.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
  }
`;

export default iomando;
