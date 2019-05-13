import { graphql } from 'gatsby';

// Blog page query
export const queryBlogData = graphql`
  fragment BlogData on MarkdownRemarkConnection {
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
