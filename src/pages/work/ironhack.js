import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

// Components
import Header from '../../components/header';
import Layout from '../../components/layout';

// Utils
import '../../styles/tabs.css';
import * as styles from './work.module.css';
import { renderPosts, extractMarkdown } from '../../utils/helpers';

const Ironhack = ({ data, location }) => {
  const coverImg1 = data.coverImg1.childImageSharp.gatsbyImageData;
  const coverImg2 = data.coverImg2.childImageSharp.gatsbyImageData;
  const coverImg3 = data.coverImg3.childImageSharp.gatsbyImageData;
  const seoImg = data.coverImg1.childImageSharp.gatsbyImageData.src;
  const pageInfo = extractMarkdown(data.pageInfo.edges);
  const posts = data.posts.edges;

  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
      image={seoImg}
    >
      <Header title={pageInfo.title} subtitle={pageInfo.excerpt} />
      <GatsbyImage
        image={coverImg1}
        className={styles.image}
        title={pageInfo.title}
        alt={pageInfo.excerpt}
      />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      <Tabs>
        <TabList>
          <Tab>
            <p>Industry insights</p>
          </Tab>
          <Tab>
            <p>Ironhack stories</p>
          </Tab>
        </TabList>

        <TabPanel>
          <p>
            Education is changing for the better. At Ironhack I had a unique
            opportunity to be part and lead this revolution; using technology to
            create the tools for our students to boost their careers and become
            digital creators themselves.
          </p>
          <GatsbyImage
            image={coverImg2}
            className={styles.image}
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
          <GatsbyImage
            image={coverImg3}
            className={styles.image}
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
    pageInfo: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/pages/ironhack.md/" }
      }
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
    coverImg1: file(relativePath: { eq: "pages/ironhack-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    coverImg2: file(relativePath: { eq: "pages/ironhack-insights.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
    coverImg3: file(relativePath: { eq: "pages/ironhack-barcelona.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
  }
`;

Ironhack.propTypes = {
  data: PropTypes.shape({
    coverImg1: PropTypes.object.isRequired,
    coverImg3: PropTypes.object.isRequired,
    coverImg2: PropTypes.object.isRequired,
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

export default Ironhack;
