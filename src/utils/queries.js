import { graphql } from 'gatsby';

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

// notebook.js
export const allNotesQuery = graphql`
  fragment allNotes on MarkdownRemarkConnection {
    edges {
      node {
        id
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          media
          path
          source
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
        isoDate(formatString: "MMMM DD, YYYY")
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

// podcast.js
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

// podcast.js
export const allRadioLanzaEpisodesQuery = graphql`
  fragment allRadioLanzaEpisodes on FeedRadioLanzaConnection {
    edges {
      node {
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
