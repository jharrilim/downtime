import React, { useState } from 'react';
import { DialogActions, Button, TextField, DialogContent, DialogTitle, Dialog, DialogContentText } from '@material-ui/core';

const SignUpForm = () => {
    const [modalState, mutModalState] = useState(false);
    return (
        <div>
        <Button variant="outlined" color="primary" onClick={_ => mutModalState(true)}>
          Open form dialog
        </Button>
        <Dialog
          open={modalState}
          onClose={_ => mutModalState(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={_ => mutModalState(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={_ => {
                // TODO: Handle form submition
                mutModalState(false);
            }} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export { SignUpForm };
