import React from 'react';
import { array, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ListingPage.css';

const SectionCategory = props => {
  const { publicData, options } = props;

  const category = publicData.category;
  const categoryOption = options.find(
    option => option.key === category
  );

  return categoryOption ? (
    <div className={css.sectionCategory}>
      <h2 className={css.categoryTitle}>
        <FormattedMessage id="ListingPage.categoryTitle" />
      </h2>
      <p className={css.category}>{categoryOption.label}</p>
    </div>
  ) : null;
};

SectionCategory.propTypes = {
  options: array.isRequired,
  publicData: shape({
    category: string,
  }).isRequired,
};

export default SectionCategory;