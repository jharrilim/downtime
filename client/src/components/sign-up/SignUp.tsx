import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { DialogActions, Button, TextField, DialogContent, DialogTitle, Dialog, DialogContentText, FormHelperText, Theme, WithStyles, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
const styles = (theme: Theme) => ({
  password: {
    width: '80%'
  }
});

interface SignUpPropTypes extends WithStyles<typeof styles> {

}

const mutation = gql`
mutation createUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    username email
  }
}
`;

const SignUpForm = ({ classes }: SignUpPropTypes) => {
  const [formIsOpen, mutFormIsOpen] = useState(false);

  const [passwordValidity, mutPasswordValidity] = useState({
    validLength: false,
    containsNumber: false,
    containsLowercase: false,
    containsUppercase: false
  });
  const [passwordIcon, mutPasswordIcon] = useState(<ErrorIcon />);
  const passwordChanged = (password: string) => mutPasswordValidity({
    validLength: password.length >= 8 ? true : false,
    containsNumber: password.search(/[\d]/) > -1 ? true : false,
    containsLowercase: password.search(/[a-z]/) > -1 ? true : false,
    containsUppercase: password.search(/[A-Z]/) > -1 ? true : false
  });

  useEffect(() => {
    const { validLength, containsLowercase, containsNumber, containsUppercase } = passwordValidity;
    mutPasswordIcon(validLength && containsLowercase && containsNumber && containsUppercase 
      ? <CheckCircleIcon /> : <ErrorIcon />
    );
  });

  return (
    <>
      <Button variant="outlined" color="primary" onClick={_ => mutFormIsOpen(true)}>
        Sign Up
        </Button>
      <Dialog
        open={formIsOpen}
        onClose={_ => mutFormIsOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up to Downtime</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              To make posts on our website, you will need to sign up first.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              className={classes.password}
              onChange={evt => passwordChanged(evt.target.value)}
            />
            {passwordIcon}
            <FormHelperText id="password-helper-text">
            Password must be greater than 8 characters,
            contain atleast one lowercase letter, atleast one uppercase letter, and atleast one number.
            </FormHelperText>
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              className={classes.password}
            />
            <FormHelperText id="confirm-password-error-text"></FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={_ => mutFormIsOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={_ => {
              // TODO: Handle form submition
              mutFormIsOpen(false);
            }} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const SignUp = withStyles(styles)(SignUpForm);
export { SignUp };
