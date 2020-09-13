const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const blogPostPage = path.resolve(`src/components/BlogPost/BlogPost.js`);
  const tagPage = path.resolve(`src/components/TagPage/TagPage.js`);

  // Fetch all md posts in the blog folder
  const fetchBlogPosts = await graphql(`
    {
      blogPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 10000
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

  if (fetchBlogPosts.errors) {
    throw fetchBlogPosts.errors;
  }

  // posts is an array of objects { node }
  const posts = fetchBlogPosts.data.blogPosts.edges;

  // Create pages for each blog post using frontmatter.path
  posts.forEach((post, index) => {
    const prev =
      index === posts.length - 1 ? posts[index].node : posts[index + 1].node;
    const next = index === 0 ? posts[index].node : posts[index - 1].node;
    createPage({
      path: post.node.frontmatter.path,
      component: blogPostPage,
      context: {
        prev,
        next,
      },
    });
  });

  // List all the unique tags found in the blog posts
  let allTags = [];
  posts.forEach(({ node }) => {
    allTags = [...allTags, ...node.frontmatter.tags];
  });

  const uniqTags = [...new Set(allTags)];
  uniqTags.forEach((tag) => {
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
        filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(episodes)/" } }
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
