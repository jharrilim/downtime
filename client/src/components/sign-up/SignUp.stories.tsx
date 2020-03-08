import React from 'react';
import { SignUp } from './SignUp';
import { action } from '@storybook/addon-actions';

export default {
  title: 'SignUp',
  component: SignUp,
};

export const SignUpStory = () =>
  <SignUp
    onSubmit={action('onSubmit')}
  />;
