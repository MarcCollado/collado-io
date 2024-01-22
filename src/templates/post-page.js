import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { toTitleCase, tagListGenerator } from '../utils/helpers';

const Post = ({ data, location, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { date, excerpt, tags, title } = frontmatter;

  // next and previous posts are available from frontmatter
  // const next = pageContext.next.frontmatter.path;
  // const prev = pageContext.prev.frontmatter.path;

  // prevent posts tagged with `excludedTags` from rendering excerpts
  const excludedTags = ['books', 'til'];

  return (
    <Layout location={location}>
      <article>
        <h1>{toTitleCase(title)}</h1>
        {tags.some((t) => excludedTags.includes(t)) || (
          <p className="excerpt">{excerpt}</p>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className="meta-container">
          <small>{`First published on ${date}`}</small>
          {tagListGenerator(tags)}
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query PostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        excerpt
        # featured
        # language
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

export const Head = ({ data, location }) => {
  const { title, excerpt } = data.markdownRemark.frontmatter;
  return (
    <Seo pageTitle={title} pageDescription={excerpt} location={location} />
  );
};

export default Post;
