import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = createStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

interface PostPropTypes extends WithStyles<typeof styles> {
    title: string;
    content: string;
}

function Post(props: PostPropTypes) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography component="p">
            {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default withStyles(styles)(Post);
