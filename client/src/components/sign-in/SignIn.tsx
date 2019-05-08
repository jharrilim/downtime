import React, { useState } from 'react';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { Button, Dialog, DialogTitle, DialogContent, TextField, withStyles, Theme, WithStyles, FormHelperText, DialogActions, FormLabel, Grid, Popover, Snackbar } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { signIn, SignInInput } from '../../data/mutations/sign-in';

const styles = (theme: Theme) => ({
  email: {
    width: '90%'
  },
  password: {
    width: '90%'
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
      <Button
        id="signInButton"
        name="signInButton"
        onClick={_ => {
          mutFormIsOpen(true);
        }
      }>
        Sign In
      </Button>
      <Dialog
        open={formIsOpen}
        onClose={_ => dialogClosed()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
        <form onSubmit={e => e.preventDefault()}>
          <DialogContent>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  label="Email Address"
                  type="email"
                  className={classes.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.password}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={_ => dialogClosed()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                // mutFormIsOpen(false);
                onSubmit({ password, email });
              }}
              color="primary"
            >
              Sign In
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});

const SignIn = () => {
  const [snackbarOpen, mutSnackbarOpen] = useState(false);
  return (
    <Mutation mutation={signIn}>
      {(mutateFn, { data, error }) => {
        if(error) {
          mutSnackbarOpen(true);
          setTimeout(() => {
            mutSnackbarOpen(false);
          }, 6000);
          return (
            <>
              <Snackbar 
                open={snackbarOpen}
                onClose={() => mutSnackbarOpen(false)}
                autoHideDuration={6000} 
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                message={error.message} />
              <SignInBase onSubmit={(evt: SignInInput) => mutateFn({ variables: { signInInput: evt } })} />
            </>
          );
        }
        if (data) {
          const userInfo = {
            id: data.createUser.id,
            username: data.createUser.username,
            email: data.createUser.email
          }
          writeStorage('user', JSON.stringify(userInfo));
          mutSnackbarOpen(true);
          setTimeout(() => {
            mutSnackbarOpen(false);
          }, 6000);
          return <Snackbar 
            open 
            autoHideDuration={6000} 
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            message={`Successfully Logged in as ${data.username}.`}
            
          />

        }
        return <SignInBase onSubmit={(evt: SignInInput) => mutateFn({ variables: { signInInput: evt } })} />;
      }}
    </Mutation>
  );
};

export { SignIn };