import React, { useState } from 'react';
import { Paper, Typography, Theme, WithStyles, TextField, withStyles, Button, Icon } from '@material-ui/core';
import { Mutation, FetchResult } from 'react-apollo';
import { postsQuery } from '../../data/queries/posts';
import { createPost, CreatePostReturnType } from '../../data/mutations/create-post';
import { PostModel } from '../../data/models/Post.model';

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

interface FormState {
  title: string;
  content: string;
}

interface NewPostFormPropTypes extends WithStyles<typeof styles> {
  onSubmit: (state: FormState) => any;
}

// TODO: Add state, send form inputs from state to submit
const NewPostForm = ({ classes, onSubmit }: NewPostFormPropTypes) => {
  const [postState, mutState] = useState({
    title: '',
    content: ''
  } as FormState);

  return (
    <Paper>
      <form onSubmit={_ => onSubmit(postState)}>
        <TextField id="titleInput" placeholder="Title" InputProps={classes} onChange={e => mutState({
          title: e.target.value,
          content: postState.content
        })} />
        <br />
        <TextField id="contentInput" placeholder="Write about something here..." multiline
          onChange={e => mutState({
            title: postState.title,
            content: e.target.value
          })}
        />
        <br />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Send <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </form>
    </Paper>
  );
};

const NewPostFormMutation = (props: NewPostFormPropTypes) => (
  <Mutation 
    mutation={createPost}
    update={(cache, {data}: FetchResult<CreatePostReturnType> ) => {
      let posts = cache.readQuery<Array<PostModel>>({query: postsQuery});
      if (!posts) {
        posts = [];
      }
      if(data !== undefined) {
        posts.push({...data});
        cache.writeQuery({
          query: postsQuery,
          data: {
            posts
          }
        });
      }
    }}
  >
    {(mutateFn, { loading, error }) => {
      if (loading) return <Typography variant="headline" >Loading...</Typography>;
      if (error) {
        console.error(error);
        return <Typography variant="headline" >Error creating post. {error.message}</Typography>;
      }
      return <NewPostForm onSubmit={(evt) => mutateFn({ variables: { postInput: evt } })} classes={props.classes} />;
    }}
  </Mutation>
);

const NewPost = withStyles(styles)(NewPostFormMutation);

export { NewPost };
