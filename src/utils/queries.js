import { graphql } from 'gatsby';

/*
Used by: Blog, Books, Now, Work(s)
- No `html` is requested since this query only generates cards
- `html` is requested on postPage
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
Used by: Home, Books, Work (and 3x work pages), Now, Tags, 404
- Retrieves the markdown data to build top-level pages
- Work pages are later sourced by
*/
export const PageMarkdownQuery = graphql`
  fragment pageMarkdown on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          excerpt
          path
          title
        }
        html
        id
      }
    }
  }
`;

/*
Used by: Work to render WorkCards
- Retrieves the markdown data to build WorkCards
- If the item has its own WorkPage, gets `path`, otherwise, gets `link`
*/
export const WorkMarkdownQuery = graphql`
  fragment workMarkdown on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
          date(formatString: "YYYY")
          excerpt
          link # for pages that don't have a dedicated WorkPage
          path # for pages that have a dedicated WorkPage
          position
          # seo
          status # [Active, Idle, Stopped, Sold]
          title
          type
        }
        html
        id
      }
    }
  }
`;
