import React from 'react';
import { graphql } from 'gatsby';

import Header from '../../components/header';
import Layout from '../../components/layout';
import PostCard from '../../components/postCard';

import { extractMarkdown, workmaps } from '../../utils/helpers';

const WorkPage = ({ data, location }) => {
  const md = extractMarkdown(data.md.edges);
  // Media card generator
  const renderMediaCards = data.mediaCards.edges
    .filter((edge) => edge.node.frontmatter.title in workmaps)
    .map((edge) => {
      const k = edge.node.frontmatter.title;
      const v = workmaps[k];
      const img = data[v].childImageSharp.gatsbyImageData;

      return (
        <PostCard
          key={edge.node.id}
          date={null}
          excerpt={edge.node.frontmatter?.excerpt}
          image={img}
          path={edge.node.frontmatter?.path}
          title={k}
        />
      );
    });

  return (
    <Layout
      article={false}
      description={md.excerpt}
      image={null}
      pathname={location.pathname}
      title={md.title}
    >
      <Header title={md.title} subtitle={md.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: md.html }} />
      {renderMediaCards}
    </Layout>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/work.md/" } }
      limit: 1
    ) {
      ...pageMarkdown
    }
    mediaCards: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...pageMarkdown
    }
    safareig: file(relativePath: { eq: "logos/safareig.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256)
      }
    }
    gamestry: file(relativePath: { eq: "logos/gamestry.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256)
      }
    }
    radioLanza: file(relativePath: { eq: "logos/radio-lanza.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256)
      }
    }
    ironhack: file(relativePath: { eq: "logos/ironhack.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256)
      }
    }
    iomando: file(relativePath: { eq: "logos/iomando.png" }) {
      childImageSharp {
        gatsbyImageData(width: 256)
      }
    }
  }
`;

export default WorkPage;
