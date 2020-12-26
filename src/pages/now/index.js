import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { renderPosts } from '../../utils/helpers';

const NowPage = ({ data, location }) => {
  const nowPageInfo = {
    title: data.nowPageInfo.edges[0].node.frontmatter.title,
    excerpt: data.nowPageInfo.edges[0].node.frontmatter.excerpt,
    html: data.nowPageInfo.edges[0].node.html,
  };
  const nowBlogPosts = data.nowBlogPosts.edges;
  const pastNowBlogPosts = nowBlogPosts.slice(1);
  const currentNowBlogPost = {
    title: nowBlogPosts[0].node.frontmatter.title,
    date: nowBlogPosts[0].node.frontmatter.date,
    excerpt: nowBlogPosts[0].node.frontmatter.excerpt,
    html: nowBlogPosts[0].node.html,
  };
  return (
    <Layout
      title={nowPageInfo.title}
      description={nowPageInfo.excerpt}
      pathname={location.pathname}
    >
      <Header title={nowPageInfo.title} tagline={nowPageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: nowPageInfo.html }} />
      <h2>{currentNowBlogPost.title}</h2>
      <p>{currentNowBlogPost.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: currentNowBlogPost.html }} />
      <p>
        {`That's all for ${currentNowBlogPost.title.toLowerCase()} — if you are curious about what I was up to in the past, check out older editions of the now project below 👇`}
      </p>
      {renderPosts(pastNowBlogPosts)}
    </Layout>
  );
};

export const query = graphql`
  {
    nowPageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/pages/now.md/" } }
      limit: 1
    ) {
      ...pageInfo
    }
    nowBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["now"] } }
      }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPostsWithHtml
    }
  }
`;

NowPage.propTypes = {
  data: PropTypes.shape({
    nowPageInfo: PropTypes.shape({
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
    nowBlogPosts: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string),
              featured: PropTypes.string,
              excerpt: PropTypes.string,
              source: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default NowPage;
