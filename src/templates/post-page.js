import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';
import { toTitleCase } from '../utils/helpers';

const Post = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { date, excerpt, path, tags, title } = frontmatter;
  // const next = pageContext.next.frontmatter.path;
  // const prev = pageContext.prev.frontmatter.path;
  return (
    <Layout location={''}>
      <article>
        {/* <SEO title={siteTitle}></SEO> */}
        <h1>{toTitleCase(title)}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <small>{date}</small>
        <div className="tag-box">
          {tags.map((tag) => {
            const tagPath = `/tags/${tag}`;
            return (
              <small>
                <Link to={tagPath}>{`#${tag}`}</Link>
              </small>
            );
          })}
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
