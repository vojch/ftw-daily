import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import {
  intlShape,
  injectIntl,
  FormattedMessage,
} from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
// import { Form, Button, FieldSelect } from '../../components';
import { Form, Button, FieldSelect } from '../../components';


// Create this file using EditListingFeaturesForm.module.css
// as a template.
import css from './EditListingCategoryForm.module.css';

export const EditListingCategoryFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress,
        categoryOptions,
      } = fieldRenderProps;

      const categoryPlaceholder = intl.formatMessage({
        id: 'EditListingCategoryForm.categoryPlaceholder',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCategoryForm.updateFailed" />
        </p>
      ) : null;

      const categoryRequired = required(
        intl.formatMessage({
          id: 'EditListingCategoryForm.categoryRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldSelect
            className={css.category}
            name="category"
            id="category"
            validate={categoryRequired}
          >
            <option value="">{categoryPlaceholder}</option>
            {categoryOptions.map(c => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </FieldSelect>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingCategoryFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingCategoryFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  categoryOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingCategoryFormComponent);