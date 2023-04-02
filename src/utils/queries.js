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

// Used at blog.js and tag-page.js
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

// Used at blog.js
export const allSafareigEpisodesQuery = graphql`
  fragment allSafareigEpisodes on FeedSafareigConnection {
    edges {
      node {
        content
        id
        isoDate(formatString: "MMMM DD, YYYY")
        itunes {
          episode
        }
        link
        title
      }
    }
  }
`;

export const allFocATerraEpisodesQuery = graphql`
  fragment allFocATerraEpisodes on FeedFocATerraConnection {
    edges {
      node {
        content
        id
        isoDate(formatString: "MMMM DD, YYYY")
        itunes {
          episode
        }
        link
        title
      }
    }
  }
`;
