import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { toTitleCase, tagListGenerator } from '../utils/helpers';

const Tag = ({ data, location, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { totalCount } = data.allMarkdownRemark;
  const { tag } = pageContext;
  const tagCount = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with`;

  return (
    <Layout location={location}>
      <p className="heading-companion">{tagCount}</p>
      <h1 className="heading">{`# ${tag}`}</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const { date, excerpt, featured, title, tags, path } =
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
                  {process.env.NODE_ENV === 'development' &&
                    tagListGenerator(tags)}
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

export const query = graphql`
  query tagPageQuery($tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/media/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      ...allBlogPosts
    }
  }
`;

export const Head = ({ data, location, pageContext }) => {
  const { totalCount } = data.allMarkdownRemark;
  const { tag } = pageContext;
  const tagCount = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with`;
  return (
    <Seo
      pageTitle={`${tag} — tag page`}
      pageDescription={`${tagCount} ${tag}`}
      location={location}
    />
  );
};

export default Tag;
