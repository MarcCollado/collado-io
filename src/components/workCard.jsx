import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { fluid } from '../utils/fluid';

// Styled Components

const CardLink = styled(Link)`
  align-items: center;
  border-bottom: 1px solid var(--fakeAsbestos22);
  display: flex;
  flex-direction: row;
`;

const Icon = styled(GatsbyImage)`
  margin-inline-end: ${fluid(16, 24)};
  max-height: ${fluid(64, 80)};
  max-width: ${fluid(64, 80)};

  & img {
    border-radius: ${fluid(32, 40)};
  }
`;

const MetaContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const PillContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
`;

const CardTitle = styled.h2`
  // margin-top: matches margin-bottom @ WorkCardPill
  // margin-bottom: matches margin-top @ WorkCardPill
  margin: ${fluid(16, 24)} 0px ${fluid(2, 8)} 0px;
`;

const CardExcerpt = styled.p`
  font-size: smaller;
  margin: 0px;
`;

const StatusLight = styled.div`
  border-radius: ${fluid(2, 4)};
  background-color: tomato;
  height: ${fluid(4, 8)};
  margin-inline-end: ${fluid(4, 6)};
  width: ${fluid(4, 8)};
`;

const CardPill = styled.p`
  border: 1px solid var(--fakeAsbestos22);
  border-radius: ${fluid(4, 8)};
  font-size: 10px;
  margin: ${fluid(4, 8)} ${fluid(4, 6)} ${fluid(16, 24)} 0px;
  padding: ${fluid(0, 2)} ${fluid(4, 8)};

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const StatusPillContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

// Main Components

const WorkCard = ({
  date,
  excerpt,
  image,
  path,
  position,
  status,
  title,
  type,
}) => (
  <CardLink to={path}>
    <Icon image={image} alt={title} />
    <MetaContainer>
      <CardTitle>{title}</CardTitle>
      <CardExcerpt>{excerpt}</CardExcerpt>
      <PillContainer>
        <CardPill>{type}</CardPill>
        <CardPill>{position}</CardPill>
        <CardPill>{date}</CardPill>
        <CardPill>
          <StatusPillContainer>
            {/* <StatusLight /> */}
            {status}
          </StatusPillContainer>
        </CardPill>
      </PillContainer>
    </MetaContainer>
  </CardLink>
);

export default WorkCard;
