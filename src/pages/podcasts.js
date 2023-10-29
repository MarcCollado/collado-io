import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { podcastFeedGenerator } from '../utils/helpers';

const Podcasts = ({ data, location }) => {
  const seoData = {
    pageDescription: `All podcast episodes.`,
    pageTitle: `Podcasts`,
  };

  return (
    <Layout location={location} seoData={seoData}>
      <ol style={{ listStyle: `none` }}>{podcastFeedGenerator(data)}</ol>
    </Layout>
  );
};

export const podcastsQuery = graphql`
  query {
    fatEpisodes: allFeedFocATerra(sort: { isoDate: DESC }) {
      ...allFocATerraEpisodes
    }
    safareigEpisodes: allFeedSafareig(sort: { isoDate: DESC }) {
      ...allSafareigEpisodes
    }
    radioLanzaEpisodes: allFeedRadioLanza(sort: { isoDate: DESC }) {
      ...allRadioLanzaEpisodes
    }
  }
`;

export default Podcasts;
