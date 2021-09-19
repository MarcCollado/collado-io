const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const postPage = path.resolve(`src/components/postPage.js`);
  const tagPage = path.resolve(`src/components/tagPage.js`);

  // Fetch all markdown posts
  const fetchPosts = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/md/posts/" } }
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

  // posts -> [{ node }, { node }, ..., { node }]
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
};
