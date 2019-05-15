import React from 'react';
import { Snackbar } from "@material-ui/core";
import { useState } from "react";

interface CustomSnackbarPropTypes {
  timeMilliseconds: number;
  message: string;
}

export interface SnackbarPropTypes {
  message: string;
}

const CustomSnackbar = ({ timeMilliseconds, message }: CustomSnackbarPropTypes) => {
  const [snackbarOpen, mutSnackbarOpen] = useState(true);
  setTimeout(() => {
    mutSnackbarOpen(false);
  }, timeMilliseconds);
  return (
    <Snackbar
      open={snackbarOpen}
      onClose={() => mutSnackbarOpen(false)}
      autoHideDuration={timeMilliseconds}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      message={message}
    />
  );
};

export const SlowSnackbar = ({ message }: SnackbarPropTypes) => (
  <CustomSnackbar timeMilliseconds={6000} message={message} />
);

export const FastSnackbar = ({ message }: SnackbarPropTypes) => (
  <CustomSnackbar timeMilliseconds={3000} message={message} />
);
