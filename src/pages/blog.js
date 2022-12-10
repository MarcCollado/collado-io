import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import { toTitleCase } from '../utils/helpers';

const Blog = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;
  const seoData = {
    pageDescription: `All blog posts.`,
    pageTitle: ``,
  };
  return (
    <Layout location={location} seoData={seoData}>
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
                      <span itemProp="title">{toTitleCase(title)}</span>
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
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
        frontmatter: { tags: { nin: ["drafts", "now"] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      ...allPosts
    }
  }
`;

export default Blog;
