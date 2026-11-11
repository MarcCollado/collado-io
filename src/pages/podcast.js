import * as React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/seo';
import { podcastFeedGenerator } from '../utils/helpers';

const Podcast = ({ data }) => (
  <>
    <h1 className="visually-hidden">Podcast</h1>
    {podcastFeedGenerator(data)}
  </>
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
    pageTitle="Podcast"
    pageDescription="Marc's podcast episodes"
    location={location}
  />
);

export default Podcast;
