import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { tagListGenerator } from '../utils/helpers';
import { toTitleCase } from '../utils/titleCase';

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
          const { displayDate, language, title, tags, path } =
            post.node.frontmatter;
          return (
            <li key={post.node.id}>
              <article className="post-list-item">
                <header>
                  <h2>
                    <Link to={path}>{toTitleCase(title, language)}</Link>
                  </h2>
                  {process.env.NODE_ENV === 'development' &&
                    tagListGenerator(tags)}
                  <small>{displayDate}</small>
                </header>
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
      pageTitle={`#${tag}`}
      pageDescription={`${tagCount} ${tag}`}
      location={location}
      // Tag archives are thin index pages — let Google follow the links to
      // posts (link equity) but keep these listings out of the index so they
      // don't compete with the canonical post URLs.
      pageRobots="noindex,follow"
    />
  );
};

export default Tag;
