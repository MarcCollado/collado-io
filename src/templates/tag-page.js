import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import { toTitleCase } from '../utils/helpers';

const Tag = ({ data, location, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { totalCount } = data.allMarkdownRemark;
  const { tag } = pageContext;
  const tagCount = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with`;
  const seoData = {
    pageDescription: `${tagCount} ${tag}`,
    pageTitle: `${tag} — tag page`,
  };

  return (
    <Layout location={location} seoData={seoData}>
      <p className="heading-companion">{tagCount}</p>
      <h1 className="heading">{tag}</h1>
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

// GraphQL

export const query = graphql`
  query tagPageQuery($tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
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
