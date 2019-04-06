import React, { useState } from 'react';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, withStyles, Theme, WithStyles, FormHelperText, DialogActions } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { signIn, SignInInput } from '../../data/mutations/sign-in';

const styles = (theme: Theme) => ({
  email: {

  },
  password: {
    
  }
});

interface SignInPropTypes extends WithStyles<typeof styles> { 
  onSubmit: (evt: any) => any;
}

const SignInBase = withStyles(styles)(({ classes, onSubmit }: SignInPropTypes) => {
  const [user] = useLocalStorage('user');
  const [formIsOpen, mutFormIsOpen] = useState(false);
  const [email, mutEmail] = useState('');
  const [password, mutPassword] = useState('');

  const dialogClosed = () => {
    mutFormIsOpen(false);
  };

  return (
    <>
      <Button>Sign In</Button>
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
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              className={classes.password}
            />
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
            >
              Sign Up
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});

const SignIn = () => (
  <Mutation mutation={signIn}>
    {(mutateFn, { data }) => {
      if (data) {
        const userInfo = {
          id: data.createUser.id,
          username: data.createUser.username,
          email: data.createUser.email
        }
        writeStorage('user', JSON.stringify(userInfo));
      }
      return <SignInBase onSubmit={(evt: SignInInput) => mutateFn({ variables: { signInInput: evt } })} />;
    }}
  </Mutation>
);

export { SignIn };