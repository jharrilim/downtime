/** global it */
import React from 'react';
import ReactDOM from 'react-dom';
import { SignUpButton } from './SignUpButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUpButton isLoggedIn onSignOutClick={_ =>{}} onSignUpClick={_=>{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
