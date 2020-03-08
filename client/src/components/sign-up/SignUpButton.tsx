import React, { FC } from 'react';
import { Button } from "@material-ui/core";

interface SignUpButtonPropTypes {
  isLoggedIn: boolean,
  onSignUpClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onSignOutClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const SignUpButton: FC<SignUpButtonPropTypes> = ({
  isLoggedIn,
  onSignUpClick,
  onSignOutClick
}) => isLoggedIn
  ? <Button color="secondary" onClick={ev => onSignOutClick(ev)}>
      Sign Out
    </Button>
  : <Button onClick={ev => onSignUpClick(ev)}>
      Register
    </Button>;
