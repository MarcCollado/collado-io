import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import { FlexCenter } from '../styles/containers';

// Styled Components

const FilterButton = styled.input`
  background-color: #ffffff;
  border: 1px solid var(--fakeAsbestos22);
  border-radius: 4px;
  color: var(--fakeAsbestos);
  margin: 0px auto;
  padding: 8px 32px;
  text-decoration: none;
  transition: all 300ms ease;

  @media (min-width: 768px) {
    &:hover {
      border: 1px solid var(--fakeAsbestos88);
    }
  }
`;

// Make the list scroll -> https://stackoverflow.com/questions/29793160/making-unordered-list-scrollable/29793235

const FilterModal = styled.div`
  border: 1px solid var(--fakeAsbestos88);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 24px;
  position: absolute;
  z-index: 1;
`;

// Main Components

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query FilterQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src/content/md/posts/" } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);
  const tags = data.allMarkdownRemark.group;
  return (
    <FlexCenter>
      <FilterButton
        onClick={(e) => setIsOpen(true)}
        type="button"
        value="Filter"
      />
      {isOpen && (
        <FilterModal>
          <FilterButton
            onClick={(e) => setIsOpen(false)}
            type="button"
            value="Apply Filters"
          />
          <hr />
          {tags.map((tag) => (
            <div key={tag.fieldValue}>
              <input
                id={tag.fieldValue}
                name={tag.fieldValue}
                type="checkbox"
                value={tag.fieldValue}
              />
              <label htmlFor={tag.fieldValue.toLowerCase()}>
                <Link to={`/tags/${tag.fieldValue}/`}>
                  {`${tag.fieldValue} (${tag.totalCount})`}
                </Link>
              </label>
            </div>
          ))}
        </FilterModal>
      )}
    </FlexCenter>
  );
};

export default Filter;
