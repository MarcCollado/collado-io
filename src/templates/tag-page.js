import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

const Tag = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Tag`;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.edges;
  const { tag } = pageContext;
  const TagCount = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with #${tag}`;

  const md = {
    title: `Tag: ${tag}`,
    excerpt: `${TagCount}`,
  };

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

// GraphQL

export const query = graphql`
  query tagPageQuery($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      ...allPosts
    }
  }
`;

export default Tag;
