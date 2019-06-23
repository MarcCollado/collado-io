import { graphql } from 'gatsby';

/* Used by: BlogPage
- Fetch all markdowns for blog posts at src/markdown/blog/
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

/* Used by: WorkPage
- Fetch all markdowns for work posts at src/markdown/work/
- It is used by WorkPage to:
  - Pull content for WorkPage React Helmet SEO
  - Pull content for WorkPage copy
  - Generate the feed of WorkCard
*/
export const allWorkPostsQuery = graphql`
  fragment allWorkPosts on MarkdownRemarkConnection {
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
