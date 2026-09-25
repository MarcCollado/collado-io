import { graphql } from 'gatsby';

// `isoDate` is the raw date, for sorting and grouping by year. Posts also
// carry `displayDate` for the tag pages; the year lists format their own.

// index.js, about.js, 404.js
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

// blog.js and tag-page.js
export const allBlogPostsQuery = graphql`
  fragment allBlogPosts on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          isoDate: date
          displayDate: date(formatString: "MMMM DD, YYYY")
          language
          path
          tags
          title
        }
      }
    }
  }
`;

// blog.js
export const allBugadaPostsQuery = graphql`
  fragment allBugadaPosts on FeedBugadaConnection {
    edges {
      node {
        id
        isoDate
        link
        title
      }
    }
  }
`;

// podcast.js
export const allSafareigEpisodesQuery = graphql`
  fragment allSafareigEpisodes on FeedSafareigConnection {
    edges {
      node {
        id
        isoDate
        itunes {
          episode
        }
        link
        title
      }
    }
  }
`;

// podcast.js
export const allFocATerraEpisodesQuery = graphql`
  fragment allFocATerraEpisodes on FeedFocATerraConnection {
    edges {
      node {
        id
        isoDate
        itunes {
          episode
        }
        link
        title
      }
    }
  }
`;

// podcast.js
export const allRadioLanzaEpisodesQuery = graphql`
  fragment allRadioLanzaEpisodes on FeedRadioLanzaConnection {
    edges {
      node {
        id
        isoDate
        itunes {
          episode
        }
        link
        title
      }
    }
  }
`;
