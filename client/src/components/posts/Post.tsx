import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardHeader } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  card: {
    minWidth: 275,
    maxWidth: 400,
    backgroundColor: "rgb(248, 248, 248)"
  },
  content: {
    textAlign: "justify"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface PostPropTypes extends WithStyles<typeof styles> {
  title: string;
  content: string;
  author: string;
  date: string;
}

const Post = withStyles(styles) ((props: PostPropTypes) => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title={props.title} subheader={props.date} />
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>

        </Typography>
        {props.content.split('\n').map(content => (
          <>
            <Typography variant="body1" className={classes.content}>
              {content}
            </Typography>
          </>
        ))

        }
      </CardContent>
    </Card>
  );
});


export { Post };
