import React, { useState } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import { Button, Dialog, DialogTitle, DialogContent, TextField, withStyles, Theme, WithStyles, Grid, DialogActions } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { loginWithPassword, LoginWithPasswordInput, LoginWithPasswordResponse } from '../../data/mutations/login-with-password';
import { SlowSnackbar } from '../common/Snackbars';
import { profileQuery, ProfileQueryResponse } from '../../data/queries/profile';

const styles = (theme: Theme) => ({
  email: {
    width: '90%'
  },
  password: {
    width: '90%'
  }
});

interface SignInPropTypes extends WithStyles<typeof styles> { 
  onSubmit: (evt: LoginWithPasswordInput) => any;
}

const SignInBase = withStyles(styles)(({ classes, onSubmit }: SignInPropTypes) => {
  const [formIsOpen, mutFormIsOpen] = useState(false);
  const [email, mutEmail] = useState('');
  const [password, mutPassword] = useState('');

  const dialogClosed = () => {
    mutFormIsOpen(false);
  };
  const usernameOrEmailChanged = (usernameOrEmail: string) => {
    mutEmail(usernameOrEmail);
  };

  const passwordChanged = (password: string) => {
    mutPassword(password);
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
                  label="Username or Email Address"
                  type="email"
                  className={classes.email}
                  autoComplete="email"
                  onChange={e => usernameOrEmailChanged(e.target.value)}
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
                  onChange={e => passwordChanged(e.target.value)}
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
                onSubmit({ usernameOrEmail: email, password });
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

  return (
    <Mutation<LoginWithPasswordResponse> mutation={loginWithPassword} >
      {(mutateFn, { data, error, client }) => {
        if(error) {
          return (
            <>
              <SlowSnackbar message={error.networkError ? error.networkError.message : error.message} />
              <SignInBase onSubmit={(evt: LoginWithPasswordInput) => mutateFn({ variables: { loginWithPasswordInput: evt } })} />
            </>
          );
        }
        if (data) {
          
          const token = data.loginWithPassword;
          document.cookie = `secure;samesite=strict;token=${token};`;
          client.query<ProfileQueryResponse>({query: profileQuery}).then(resp => {
            writeStorage('user', JSON.stringify(resp.data.profile));
            
          });
        }
        return <SignInBase 
          onSubmit={(evt: LoginWithPasswordInput) => mutateFn({ 
            variables: { 
              loginWithPasswordInput: evt 
            }
          })
        }/>;
      }}
    </Mutation>
  );
};

export { SignIn };
