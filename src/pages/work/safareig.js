import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/layout';
import { extractMarkdown } from '../../utils/helpers';

const Safareig = ({ data, location }) => {
  const coverImg = data.coverImg.childImageSharp.gatsbyImageData;
  const seoImg = data.coverImg.childImageSharp.gatsbyImageData.src;
  const md = extractMarkdown(data.md.edges);
  // const posts = data.posts.edges;

  return (
    <Layout
      article={false}
      coverImage={coverImg}
      md={md}
      pathname={location.pathname}
      seoImage={seoImg}
    >
      {/* {renderPosts(posts)} */}
    </Layout>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/pages/work/safareig.md/" }
      }
      limit: 1
    ) {
      ...pageMarkdown
    }
    # posts: allMarkdownRemark(
    #   filter: {
    #     fileAbsolutePath: { regex: "/src/content/md/posts/" }
    #     frontmatter: { tags: { in: ["safareig"] } }
    #   }
    #   sort: { fields: [frontmatter___date], order: DESC }
    # ) {
    #   ...allPosts
    # }
    coverImg: file(relativePath: { eq: "pages/safareig-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1024)
      }
    }
  }
`;

export default Safareig;
