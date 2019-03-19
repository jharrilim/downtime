import React, { FormEventHandler } from 'react';
import { FormControl, Paper, Typography, Theme, WithStyles, TextField, withStyles, Button, Icon } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const styles = (theme: Theme) => ({
  title: {
    fontSize: 50
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

interface NewPostFormPropTypes extends WithStyles<typeof styles> {
  onSubmit: FormEventHandler;
}

const mutation = gql`
mutation createPost($postInput: PostInput!) {
  createPost(postInput: $postInput) {
    content title dateCreated author {
      username
    }
  }
}
`;

// TODO: Add state, send form inputs from state to submit
const NewPostForm = ({ classes, onSubmit }: NewPostFormPropTypes) => (
  <Paper>
    <form onSubmit={onSubmit}>
      <TextField id="titleInput" placeholder="Title" InputProps={classes} />
      <br />
      <TextField id="contentInput" placeholder="Write about something here..." multiline />
      <br />
      <Button type="submit" variant="contained" color="primary" className={classes.button}>
        Send <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </form>
  </Paper>
);

const NewPostFormMutation = (props: NewPostFormPropTypes) => (
  <Mutation mutation={mutation}>
    {(mutateFn, { loading, error }) => {
      if (loading) return <Typography variant="headline" >Loading...</Typography>;
      if (error) {
        console.error(error);
        return <Typography variant="headline" >Error creating post. {error.message}</Typography>;
      }
      return <NewPostForm onSubmit={(evt) => mutateFn()} classes={props.classes} />;
    }}
  </Mutation>
);

const NewPost = withStyles(styles)(NewPostFormMutation);

export { NewPost };
