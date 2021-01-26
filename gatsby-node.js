const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postPage = path.resolve(`src/components/post.js`);
  const tagPage = path.resolve(`src/components/TagPage/TagPage.js`);

  // Fetch all markdown posts
  const fetchPosts = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/markdown/posts/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
          }
        }
      }
    }
  `);

  if (fetchPosts.errors) {
    throw fetchPosts.errors;
  }

  // [{ node }]
  const posts = fetchPosts.data.posts.edges;

  // Create a page for each post through path
  posts.forEach((post, index) => {
    const prev =
      index === posts.length - 1 ? posts[index].node : posts[index + 1].node;
    const next = index === 0 ? posts[index].node : posts[index - 1].node;
    createPage({
      path: post.node.frontmatter.path,
      component: postPage,
      context: {
        prev,
        next,
      },
    });
  });

  // List all unique tags
  let allTags = [];
  posts.forEach(({ node }) => {
    allTags = [...allTags, ...node.frontmatter.tags];
  });
  const uniqueTags = [...new Set(allTags)];
  // Create a page for each tag
  uniqueTags.forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: tagPage,
      context: { tag },
    });
  });

  const episodePostPage = path.resolve(
    `src/components/EpisodePost/EpisodePost.js`
  );

  // Fetch all md posts in the episodes folder
  const fetchEpisodes = await graphql(`
    {
      radioLanzaEpisodes: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/markdown/episodes/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 10000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (fetchEpisodes.errors) {
    throw fetchEpisodes.errors;
  }

  // radioLanzaEpisodes is an array of objects { node }
  const radioLanzaEpisodes = fetchEpisodes.data.radioLanzaEpisodes.edges;

  // Create pages for each episode using `frontmatter.path`
  radioLanzaEpisodes.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: episodePostPage,
      context: {},
    });
  });
};
