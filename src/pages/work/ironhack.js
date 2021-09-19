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

const Ironhack = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.gatsbyImageData;
  const seoImg = data.coverImg.childImageSharp.gatsbyImageData.src;
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
            <p>Insights</p>
          </Tab>
          <Tab>
            <p>Stories</p>
          </Tab>
        </TabList>

        <TabPanel>
          <p>
            Education is changing for the better. At Ironhack I had a unique
            opportunity to be part and lead this revolution; using technology to
            create the tools for our students to boost their careers and become
            digital creators themselves.
          </p>
          <CoverImage
            image={insightsImg}
            title="Ironhack insights"
            alt="Ironhack is changing education for the better."
          />
          <p>
            Thousands of graduates across eleven locations have taught me a lot
            about education and how we learn. Here is a recollection of posts
            around educational products and methodologies. What has worked, what
            has not, and the lessons we have learned along the way.
          </p>
          {renderPosts(posts, 'idea')}
        </TabPanel>
        <TabPanel>
          <p>
            Back in 2015, when I joined Ironhack, it looked nothing like today.
            We were barely ten of us and the idea of changing people lives in
            just two months sounded more of a wild dream rather than an
            attainable reality.
          </p>
          <CoverImage
            image={storiesImg}
            title="Ironhack stories"
            alt="Recollection of posts that cover my story at Ironhack from a more confidential, idiosyncratic perspective."
          />
          <p>
            After more than four years, I have accumulated thousands of stories,
            from being a student myself to scaling campuses operations. Here is
            a recollection of posts that cover my story at Ironhack from a more
            confidential, idiosyncratic perspective.
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
        fileAbsolutePath: { regex: "/src/content/md/pages/ironhack.md/" }
      }
      limit: 1
    ) {
      ...pageMarkdown
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: ["ironhack"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
    coverImg: file(relativePath: { eq: "pages/ironhack-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    insightsImg: file(relativePath: { eq: "pages/ironhack-insights.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    storiesImg: file(relativePath: { eq: "pages/ironhack-barcelona.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
  }
`;

export default Ironhack;
