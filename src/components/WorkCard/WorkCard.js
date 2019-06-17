import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styles from './WorkCard.module.css';

// Returns the matching graphQL query name for each Frontmatter title
const titleTranslator = {
  iomando: 'iomando',
  Ironhack: 'ironhack',
  'Radio Lanza': 'radioLanza'
};

const WorkCard = ({ data, excerpt, path, title }) => {
  const titleKey = titleTranslator[title];
  return (
    <div className={styles.card}>
      <Link className={styles.card__link} to={path}>
        <Img fluid={data[titleKey].childImageSharp.fluid} alt={title} />
        <div className={styles.card__wrapper}>
          <h2 className={styles.card__title}>{title}</h2>
          <p className={styles.card__excerpt}>{excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query WorkCardQuery {
        radioLanza: file(relativePath: { eq: "radio-lanza.png" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        ironhack: file(relativePath: { eq: "ironhack.png" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        iomando: file(relativePath: { eq: "iomando.png" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => <WorkCard data={data} {...props} />}
  />
);

WorkCard.propTypes = {
  data: PropTypes.shape({
    iomando: PropTypes.object.isRequired,
    ironhack: PropTypes.object.isRequired,
    radioLanza: PropTypes.object.isRequired
  }).isRequired,
  excerpt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
