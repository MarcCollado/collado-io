import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import { toTitleCase } from '../utils/helpers';

const Post = ({ data, location, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { date, excerpt, tags, title } = frontmatter;
  // const next = pageContext.next.frontmatter.path;
  // const prev = pageContext.prev.frontmatter.path;
  const seoData = {
    pageDescription: `${excerpt}`,
    pageTitle: `${title}`,
  };
  return (
    <Layout location={location} seoData={seoData}>
      <article>
        {/* <SEO title={siteTitle}></SEO> */}
        <h1>{toTitleCase(title)}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className="meta-container">
          <small>{`First published on ${date}`}</small>
          <div className="tag-container">
            {tags.map((tag) => {
              const tagPath = `/tags/${tag}`;
              return (
                <small key={tag}>
                  <Link to={tagPath}>{`#${tag}`}</Link>
                </small>
              );
            })}
          </div>
        </div>
      </article>
    </Layout>
  );
};

// GraphQL

export const query = graphql`
  query PostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        # featured
        path
        # source
        tags
        title
      }
      html
      # id
    }
  }
`;

export default Post;
