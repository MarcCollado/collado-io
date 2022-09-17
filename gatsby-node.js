const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const tagPage = path.resolve(`src/templates/tag-page.js`);

  // Fetch all markdown posts
  const fetchPosts = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/media/markdown/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              tags
            }
          }
          next {
            id
            frontmatter {
              path
              title
            }
          }
          previous {
            id
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(result.errors);
    return;
  }

  // posts -> [{ node }, { node }, ..., { node }]
  const posts = fetchPosts.data.posts.edges;

  // Create a page for each post through path
  posts.forEach((post, index) => {
    const next = post.edges.next;
    const prev = post.edges.previous;
    createPage({
      path: post.node.frontmatter.path,
      component: blogPost,
      context: {
        next,
        prev,
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
