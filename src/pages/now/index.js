import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { renderFilteredBlogCards } from '../../utils/helpers';

const NowPage = ({ data }) => {
  const nowIndex = {
    title: data.nowIndex.edges[0].node.frontmatter.title,
    excerpt: data.nowIndex.edges[0].node.frontmatter.excerpt,
    html: data.nowIndex.edges[0].node.html
  };
  const nowBlogPosts = data.nowBlogPosts.edges;
  const pastNowBlogPosts = nowBlogPosts.slice(1);
  const renderPastNowBlogPosts = renderFilteredBlogCards.bind(
    null,
    pastNowBlogPosts
  );
  const currentNowBlogPost = {
    title: nowBlogPosts[0].node.frontmatter.title,
    date: nowBlogPosts[0].node.frontmatter.date,
    excerpt: nowBlogPosts[0].node.frontmatter.excerpt,
    html: nowBlogPosts[0].node.html
  };
  return (
    <Layout title={nowIndex.title} description={nowIndex.excerpt}>
      <Header title={nowIndex.title} tagline="Things I'm Doing" />
      <div dangerouslySetInnerHTML={{ __html: nowIndex.html }} />
      <h2>{currentNowBlogPost.title}</h2>
      <p>{currentNowBlogPost.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: currentNowBlogPost.html }} />
      <p>
        {`That's all for ${currentNowBlogPost.title.toLowerCase()} — if you are curious about what I was up to in the past, check out older editions of the now project below 👇`}
      </p>
      {renderPastNowBlogPosts('now')}
    </Layout>
  );
};

export const query = graphql`
  {
    nowIndex: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(now)/" } }
      limit: 1
    ) {
      ...allWorkPosts
    }
    nowBlogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" }
        frontmatter: { tags: { in: ["now"] } }
      }
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
  }
`;

NowPage.propTypes = {
  data: PropTypes.shape({
    nowIndex: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            html: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string,
              excerpt: PropTypes.string
            })
          })
        })
      )
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
              source: PropTypes.string
            })
          })
        })
      )
    })
  }).isRequired
};

export default NowPage;
