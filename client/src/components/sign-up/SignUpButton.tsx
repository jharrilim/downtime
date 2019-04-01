import { userIsLoggedIn } from "../../data/storage/user-storage";
import { Button } from "@material-ui/core";

interface SignUpButtonPropTypes {
  isLoggedIn: boolean,
  onSignUpClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onSignOutClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const SignUpButton = ({ isLoggedIn, onSignUpClick, onSignOutClick }: SignUpButtonPropTypes) => {
  return (
    <>
      {isLoggedIn ?
        <Button variant="outlined" color="primary" onClick={ev => onSignUpClick(ev)}>
          Sign Up
        </Button>
        :
        <Button variant="outlined" color="secondary" onClick={ev => onSignOutClick(ev)}>
          Sign Out
        </Button>
      }
    </>
  );
}
