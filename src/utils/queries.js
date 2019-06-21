import { graphql } from 'gatsby';

/* Used by: BlogPage
- Fetch markdowns for blog posts at src/markdown/blog/
- It is used by BlogPage to generate the feed of BlogCard
- No need to fetch html because it is used in BlogPost instead
*/
export const allBlogPostsQuery = graphql`
  fragment allBlogPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          excerpt
        }
      }
    }
  }
`;

// Work page query
export const queryWorkData = graphql`
  fragment WorkData on MarkdownRemarkConnection {
    edges {
      node {
        id
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          excerpt
        }
      }
    }
  }
`;
