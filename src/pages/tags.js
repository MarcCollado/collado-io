import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Seo from '../components/seo';
import { tagGroups } from '../utils/tags';

const Tags = ({ data }) => {
  // Only the tags in use, with their post counts
  const counts = new Map(
    data.allMarkdownRemark.group.map((tag) => [tag.fieldValue, tag.totalCount]),
  );
  return (
    <>
      <h1 className="visually-hidden">Tags</h1>
      {tagGroups.map(({ title, tags }) => (
        <section key={title}>
          <h2 className="post-list-year">{title}</h2>
          <ul className="tag-index">
            {[...tags]
              .sort()
              .filter((tag) => counts.has(tag))
              .map((tag) => (
                <li key={tag}>
                  <Link to={`/tags/${tag}/`}>{`#${tag}`}</Link>{' '}
                  <small>{counts.get(tag)}</small>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/media/posts/" } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head = ({ location }) => (
  <Seo pageTitle="Tags" pageDescription="Marc's tags" location={location} />
);

export default Tags;
