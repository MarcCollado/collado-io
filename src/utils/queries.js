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
Almost identical as allPosts, but also fetches the html
*/
export const allPostsWithHtmlQuery = graphql`
  fragment allPostsWithHtml on MarkdownRemarkConnection {
    edges {
      node {
        id
        html
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
Retrieves the data to build a top-level page layout
*/
export const PageInfoQuery = graphql`
  fragment pageInfo on MarkdownRemarkConnection {
    edges {
      node {
        id
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          excerpt
          # seo
        }
      }
    }
  }
`;

/* Used by: RadioLanza
  - Fetch all markdowns for work posts at src/markdown/episodes/
  - Generate the feed of EpisodeCard
*/
export const allRadioLanzaEpisodesQuery = graphql`
  fragment allRadioLanzaEpisodes on MarkdownRemarkConnection {
    edges {
      node {
        id
        html
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          path
          tags
          featured
          excerpt
          show
          episode
          episodeURL
          playerURL
          iTunesURL
        }
      }
    }
  }
`;
