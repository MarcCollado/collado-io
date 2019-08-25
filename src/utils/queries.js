import { graphql } from 'gatsby';

/*
Used by: BlogPage, 3xWorkPage(s)
  - Its parent query should fetch at /src/markdown/blog/
  - No html is requested since the point of this query is to generate cards
  - Used in combination with render__Cards methods
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
          tags
          featured
          excerpt
          source
        }
      }
    }
  }
`;

/*
Used by: NowPage
 - Almost identical as allBlogPosts but this one also fetches the html
*/
export const allBlogPostsWithHtmlQuery = graphql`
  fragment allBlogPostsWithHtml on MarkdownRemarkConnection {
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
          source
        }
      }
    }
  }
`;

/*
Used by: HomePage, NowPage
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
