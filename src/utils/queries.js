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
Used by: Home, Books, Work(s), Now
- Retrieves the markdown data to build a top-level pages
*/
export const PageMarkdownQuery = graphql`
  fragment pageMarkdown on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          excerpt
          path
          # seo
          title
        }
        html
        id
      }
    }
  }
`;

export const filterPosts = (tagsIn = [], tagsIni = []) => {
  const include = tagsIn.length > 0;
  const notInclude = tagsIni.length > 0;

  return !include && !notInclude
    ? `{ fileAbsolutePath: { regex: "/src/content/md/posts/" } }`
    : `{
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        ${include ? `frontmatter: { tags: { in: ${tagsIn} } }` : ''}
        ${notInclude ? `frontmatter: { tags: { ini: ${tagsIni} } }` : ''}
      }`;
};
