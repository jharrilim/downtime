import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
    ok: {
        color: 'green'
    },
    error: {
        color: 'orange'
    }
});

interface ValidationIconPropTypes extends WithStyles<typeof styles> {
    isValid: boolean;
}

export const ValidationIcon = withStyles(styles)(({ isValid, classes }: ValidationIconPropTypes) => (
    <>
        {isValid ? <CheckCircleIcon className={classes.ok} /> : <ErrorIcon className={classes.error} />}
    </>
));
