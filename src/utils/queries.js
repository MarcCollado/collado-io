import { graphql } from 'gatsby';

/*
Used by: Blog, Books, Now, Work(s)
- No html is requested since this query only generates cards
- Use in combination with render__Cards methods
*/
export const allPostsQuery = graphql`
  fragment allPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        # html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          tags
          featured
          excerpt
          # seo
          source
        }
      }
    }
  }
`;

/*
Used by: Home, Books, Now, Work(s)
- Retrieves the data to build a top-level page layout
*/
export const PageInfoQuery = graphql`
  fragment pageInfo on MarkdownRemarkConnection {
    edges {
      node {
        id
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          excerpt
          # seo
        }
      }
    }
  }
`;

export const filterPosts = (tagsIn = [], tagsIni = []) => {
  const include = tagsIn.length > 0;
  const notInclude = tagsIni.length > 0;

  return !include && !notInclude
    ? `{ fileAbsolutePath: { regex: "/src/markdown/posts/" } }`
    : `{
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        ${include ? `frontmatter: { tags: { in: ${tagsIn} } }` : ''}
        ${notInclude ? `frontmatter: { tags: { ini: ${tagsIni} } }` : ''}
      }`;
};
