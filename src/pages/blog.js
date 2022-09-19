import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

const Blog = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata?.title;
  // const authorName = data.site.siteMetadata?.author?.name;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      {/* <SEO title={siteTitle} /> */}
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const { date, excerpt, featured, title, path } =
            post.node.frontmatter;
          const isFeatured = featured;
          return (
            <li key={post.node.id}>
              <article
                className="post-list-item"
                // itemScope
                // itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={path} itemProp="url">
                      <span itemProp="title">{title}</span>
                    </Link>
                  </h2>
                  <small itemProp="date">{date}</small>
                </header>
                {isFeatured && (
                  <section>
                    <small
                      dangerouslySetInnerHTML={{
                        __html: excerpt || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export const blogQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
        }
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
        frontmatter: { tags: { nin: ["drafts", "now"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            featured
            path
            source
            tags
            title
          }
        }
      }
    }
  }
`;

export default Blog;
