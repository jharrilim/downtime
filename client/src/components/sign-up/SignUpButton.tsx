import React from 'react';
import { Button } from "@material-ui/core";

interface SignUpButtonPropTypes {
  isLoggedIn: boolean,
  onSignUpClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onSignOutClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const SignUpButton = ({ isLoggedIn, onSignUpClick, onSignOutClick }: SignUpButtonPropTypes) => {
  return (
    <>
      {!isLoggedIn ?
        <Button onClick={ev => onSignUpClick(ev)}>
          Register
        </Button>
        :
        <Button color="secondary" onClick={ev => onSignOutClick(ev)}>
          Sign Out
        </Button>
      }
    </>
  );
}
