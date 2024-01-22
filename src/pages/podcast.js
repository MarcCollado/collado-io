import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Seo from '../components/seo';
import { podcastFeedGenerator } from '../utils/helpers';

const Podcast = ({ data, location }) => (
  <Layout location={location}>
    <ol style={{ listStyle: `none` }}>{podcastFeedGenerator(data)}</ol>
  </Layout>
);

export const episodesQuery = graphql`
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

export const Head = ({ location }) => (
  <Seo
    pageTitle="Podcast — Marc Collado"
    pageDescription="Marc's podcast episodes"
    location={location}
  />
);

export default Podcast;
