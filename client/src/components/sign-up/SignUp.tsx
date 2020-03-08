import React, { useState } from 'react';
import { DialogActions, Button, TextField, DialogContent, DialogTitle, Dialog, DialogContentText, FormHelperText, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ValidationIcon } from '../icons/ValidationIcon';
import { Mutation } from 'react-apollo';
import { createUser, CreateUserInput } from '../../data/mutations/create-user';
import { SignUpButton } from './SignUpButton';
import { useLocalStorage, writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import { SlowSnackbar } from '../common/Snackbars';

const styles = (theme: Theme) => ({
  email: {
    width: '90%'
  },
  password: {
    width: '90%'
  },
  confirmPassword: {
    width: '90%'
  }
});

interface UserInput {
  email: string;
  password: string;
}

interface SignUpPropTypes extends WithStyles<typeof styles> {
  onSubmit: (evt: UserInput) => any;
}



export const SignUp = withStyles(styles)(({ classes, onSubmit }: SignUpPropTypes) => {
  const [formIsOpen, mutFormIsOpen] = useState(false);
  const [email, mutEmail] = useState('');
  const [password, mutPassword] = useState('');
  const [confirmPassword, mutConfirmPassword] = useState('');
  const [passwordIsValid, mutPasswordIsValid] = useState(false);
  const [emailIsValid, mutEmailIsValid] = useState(false);
  const [user] = useLocalStorage('user');

  const passwordChanged = (password: string) => {
    mutPassword(password);
    mutPasswordIsValid(
      password.length >= 8 &&
      password.search(/[\d]/) > -1 &&
      password.search(/[a-z]/) > -1 &&
      password.search(/[A-Z]/) > -1
    );
  };

  const emailChanged = (email: string) => {
    mutEmail(email);
    mutEmailIsValid(email.search(/\S+@\S+\.\S+/) > -1);
  }

  const dialogClosed = () => {
    mutFormIsOpen(false);
    mutEmailIsValid(false);
    mutPassword('');
    mutConfirmPassword('');
    mutPasswordIsValid(false);
  };

  return (
    <>
      <SignUpButton
        isLoggedIn={!!user}
        onSignUpClick={_ => mutFormIsOpen(true)}
        onSignOutClick={_ => deleteFromStorage('user')}
      />
      <Dialog
        open={formIsOpen}
        onClose={_ => dialogClosed()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign Up to Downtime</DialogTitle>
        <form onSubmit={e => e.preventDefault()}>
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
              className={classes.email}
              onChange={evt => emailChanged(evt.target.value)}
              autoComplete="email"
            />
            <ValidationIcon isValid={emailIsValid} />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              className={classes.password}
              onChange={evt => passwordChanged(evt.target.value)}
              autoComplete="new-password"
            />
            <ValidationIcon isValid={passwordIsValid} />
            <FormHelperText id="password-helper-text">
              Password must be greater than 8 characters,
              contain atleast one lowercase letter, atleast one uppercase letter, and atleast one number.
            </FormHelperText>
            <TextField
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              className={classes.confirmPassword}
              onChange={evt => mutConfirmPassword(evt.target.value)}
              autoComplete="new-password"
            />
            <ValidationIcon isValid={passwordIsValid && password === confirmPassword} />
          </DialogContent>
          <DialogActions>
            <Button onClick={_ => dialogClosed()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                mutFormIsOpen(false);
                onSubmit({ password, email });
              }}
              color="primary"
              disabled={!(emailIsValid && passwordIsValid && password === confirmPassword)}
            >
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});



const SignUpMutation = () => (
  <Mutation<{ createUser: CreateUserInput }> mutation={createUser}>
    {(mutateFn, { data, error }) => {
      if (error) {
        if (error.graphQLErrors) {
          return (
            <>
              <SlowSnackbar message={error.graphQLErrors[0].message} />
              <SignUp onSubmit={evt => mutateFn({ variables: { userInput: evt } })} />
            </>
          );
        }
      }
      if (data) {
        const userInfo = {
          id: data.createUser.id,
          username: data.createUser.username,
          email: data.createUser.email
        }
        writeStorage('user', JSON.stringify(userInfo));
      }
      return <SignUp onSubmit={evt => mutateFn({ variables: { userInput: evt } })} />;
    }}
  </Mutation>
);

export default SignUpMutation;
