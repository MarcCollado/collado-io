import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

const Blog = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Blog`;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location}>
      {/* <SEO title={siteTitle} /> */}
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.node.frontmatter.title;
          return (
            <li key={post.node.id}>
              <article
                className="post-list-item"
                // itemScope
                // itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.frontmatter.path} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.frontmatter.date}</small>
                </header>
                {/* Some featured posts may feature its description inline
                  <section>
                   <p
                     dangerouslySetInnerHTML={{
                       __html: post.frontmatter.excerpt || post.excerpt,
                     }}
                     itemProp="description"
                   />
                 </section> */}
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
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            featured
            excerpt
            source
          }
        }
      }
    }
  }
`;

export default Blog;
