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
import { Form, Button, FieldSelect } from '../../components';
import { GithubPicker } from 'react-color'


// Create this file using EditListingFeaturesForm.module.css
// as a template.
import css from './EditListingColorForm.module.css';

export const EditListingColorFormComponent = props => (
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
        colorOptions,
      } = fieldRenderProps;

    //   const colors = ['#D0021B', '#F5A623', '#F8E71C', '#FFFFFF'];
      const colors = colorOptions.map(c => (c.key));

      console.log(colorOptions.map(c => (c.key)));

      const colorPlaceholder = intl.formatMessage({
        id: 'EditListingColorForm.colorPlaceholder',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingColorForm.updateFailed" />
        </p>
      ) : null;

      const colorRequired = required(
        intl.formatMessage({
          id: 'EditListingColorForm.colorRequired',
        })
      );

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          {/* <FieldSelect
            className={css.color}
            name="color"
            id="color"
            validate={colorRequired}
          >
            <option value="">{colorPlaceholder}</option>
            {colorOptions.map(c => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </FieldSelect> */}
          <GithubPicker 
            colors={colors}
          />
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

EditListingColorFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingColorFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  colorOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default compose(injectIntl)(EditListingColorFormComponent);