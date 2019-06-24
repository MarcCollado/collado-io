import { graphql } from 'gatsby';

/* Used by: BlogPage, WorkPage(s),
- Fetch all markdowns for blog posts at src/markdown/blog/
- It is used by BlogPage to:
  - Generate the feed of BlogCard
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
          tags
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
          excerpt
          episodeURL
          playerURL
          iTunesURL
        }
      }
    }
  }
`;
