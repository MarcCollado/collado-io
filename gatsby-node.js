const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postPage = path.resolve(`./src/templates/post-page.js`);
  const tagPage = path.resolve(`src/templates/tag-page.js`);

  // Fetch all markdown posts
  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/media/posts/" } }
        sort: { frontmatter: { date: DESC } }
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
  const posts = result.data.posts.edges;

  // Create a page for each post through path
  posts.forEach((post, index) => {
    const next = post.next;
    const prev = post.previous;
    createPage({
      path: post.node.frontmatter.path,
      component: postPage,
      context: {
        next,
        prev,
      },
    });
  });

  // List all unique tags
  let allTags = [];
  posts.forEach(
    ({ node }) => (allTags = [...allTags, ...node.frontmatter.tags]),
  );
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
