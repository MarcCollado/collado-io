const path = require('path');

// Declare the frontmatter fields instead of letting Gatsby infer them, so
// queries keep working even if no post sets a field (most skip `language`).
// Static pages share the type but have no date or tags, hence nullable.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }

    type MarkdownRemarkFrontmatter {
      title: String!
      path: String!
      date: Date @dateformat
      tags: [String]
      excerpt: String
      language: String
      source: String
    }
  `);
};

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
              language
              path
              title
            }
          }
          previous {
            id
            frontmatter {
              language
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
  posts.forEach((post) => {
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
  const allTags = posts.flatMap(({ node }) => node.frontmatter.tags);
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
