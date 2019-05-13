import { graphql } from 'gatsby';

// Work page query
export const query = graphql`
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
