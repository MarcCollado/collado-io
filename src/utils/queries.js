import { graphql } from 'gatsby';

/*
Used by: BlogPage, WorkPage(s),
Notes:
  - Its parent query should fetch at src/markdown/blog/**
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

/* Used by: WorkPage, Workpage(s)
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

/* Used by: RadioLanza
- Fetch all markdowns for work posts at src/markdown/episodes/
- It is used by RadioLanza to:
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
