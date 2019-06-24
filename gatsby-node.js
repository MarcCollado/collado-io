const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const blogPostPage = path.resolve(`src/components/BlogPost/BlogPost.js`);
    const episodePostPage = path.resolve(
      `src/components/EpisodePost/EpisodePost.js`
    );
    const tagPage = path.resolve(`src/components/TagPage/TagPage.js`);
    // Fetch markdowns for blog posts at .../markdown/blog/
    resolve(
      graphql(`
        {
          blogPosts: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/(src)/(markdown)/(blog)/" } }
            limit: 1000
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
      `).then((result) => {
        if (result.errors) {
          throw result.errors;
        }
        const posts = result.data.blogPosts.edges;
        // Create pages for each blog post using `frontmatter.path`
        posts.forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: blogPostPage,
            context: {}
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
            context: { tag }
          });
        });
      })
    );
    // Fetch markdowns for Radio Lanza episodes at .../markdown/episodes/
    resolve(
      graphql(`
        {
          radioLanzaEpisodes: allMarkdownRemark(
            filter: {
              fileAbsolutePath: { regex: "/(src)/(markdown)/(episodes)/" }
            }
            limit: 1000
            sort: { fields: [frontmatter___date], order: DESC }
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
      `).then((result) => {
        if (result.errors) {
          throw result.errors;
        }
        const radioLanzaEpisodes = result.data.radioLanzaEpisodes.edges;
        // Create pages for each episode using `frontmatter.path`
        radioLanzaEpisodes.forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: episodePostPage,
            context: {}
          });
        });
      })
    );
  });
};
