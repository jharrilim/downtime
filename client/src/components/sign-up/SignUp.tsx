import React, { useState } from 'react';
import { DialogActions, Button, TextField, DialogContent, DialogTitle, Dialog, DialogContentText, FormHelperText, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ValidationIcon } from '../icons/ValidationIcon';
import { Mutation } from 'react-apollo';
import { createUser } from '../../data/mutations/create-user';
import { setUser, userIsLoggedIn, unsetUser } from '../../data/storage/user-storage';

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



const SignUpForm = withStyles(styles) (({ classes, onSubmit }: SignUpPropTypes) => {
  const [formIsOpen, mutFormIsOpen] = useState(false);
  const [email, mutEmail] = useState('');
  const [password, mutPassword] = useState('');
  const [confirmPassword, mutConfirmPassword] = useState('');
  const [passwordIsValid, mutPasswordIsValid] = useState(false);
  const [emailIsValid, mutEmailIsValid] = useState(false);

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
      {
        !userIsLoggedIn() ? 
        <Button variant="outlined" color="primary" onClick={_ => mutFormIsOpen(true)}>
          Sign Up
        </Button>
        :
        <Button variant="outlined" color="secondary" onClick={_ => unsetUser()}>
          Sign Out
        </Button>
      }

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
            />
            <ValidationIcon isValid={emailIsValid} />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              className={classes.password}
              onChange={evt => passwordChanged(evt.target.value)}
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
                onSubmit({password, email});
              }}
              color="primary"
              disabled={!( emailIsValid && passwordIsValid && password === confirmPassword)}
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
  <Mutation mutation={createUser}>
  {(mutateFn, { data }) => {
    if(data) {
      const userInfo = {
        id: data.createUser.id,
        username: data.createUser.username,
        email: data.createUser.email
      }
      setUser(userInfo);
    }
    return <SignUpForm onSubmit={evt => mutateFn({variables: { userInput: evt }})}/>;
  }}
  </Mutation>
);


const SignUp = SignUpMutation;
export { SignUp };
