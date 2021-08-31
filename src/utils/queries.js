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
- Retrieves the markdown data to build top-level pages
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
