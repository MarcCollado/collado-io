import { graphql } from 'gatsby';

// Used at index.js, about.js, 404.js
// Sources markdown data from a file to populate top-level pages
export const StaticPageQuery = graphql`
  fragment staticPage on MarkdownRemarkConnection {
    edges {
      node {
        frontmatter {
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

// Used at blog.js
export const allPostsQuery = graphql`
  fragment allPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          excerpt
          featured
          path
          source
          tags
          title
        }
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
