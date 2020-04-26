import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';

const ActionButton = (props) => {
  return (
    <Button 
      className={props.className}
      variant={props.variant}
      color={props.color}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      disableElevation={props.disableElevation}
      startIcon={props.startIcon}
      onClick={props.onClick}
      endIcon={props.loading ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {props.children}
    </Button>
  )
}

ActionButton.propTypes = {
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  disableElevation: PropTypes.bool, 
  startIcon: PropTypes.element,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

ActionButton.defaultProps = {
  color: 'inherit',
  variant: 'contained',
  size: 'small',
  fullWidth: false,
  disabled: false,
  disableElevation: false,
  loading: false,
};


export default ActionButton;

