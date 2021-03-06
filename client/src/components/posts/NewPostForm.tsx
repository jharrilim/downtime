import React, { useState } from 'react';
import { Typography, Theme, WithStyles, TextField, withStyles, Button, Icon, Grid } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { postsQuery } from '../../data/queries/posts';
import { createPost, CreatePostReturnType } from '../../data/mutations/create-post';
import { PostModel } from '../../data/models/Post.model';
import useLocalStorage from '@rehooks/local-storage';

const styles = (theme: Theme) => ({
  form: {
    width: "90%",
  },
  title: {
    width: "95%",
    marginTop: theme.spacing(),
    border: 'none'
  },
  content: {
    marginTop: theme.spacing(),
    width: "95%"
  },
  button: {
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(),
    paddingLeft: "1em",
    paddingRight: "1em"

  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
  titleInput: {
    fontSize: "5em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em"
    }
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
  const [user] = useLocalStorage('user');
  const submit = () => {
    if (user)
      onSubmit(postState);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <form onSubmit={_ => submit()}>
          <TextField id="titleInput"
            disabled={!user}
            placeholder="Title"
            className={classes.title}
            fullWidth
            required
            InputProps={{
              classes: {
                input: classes.titleInput,
                underline: 'none'
              }
            }}
            onChange={e => mutState({
              title: e.target.value,
              content: postState.content
            })}
          />
          <br />
          <TextField
            disabled={!user}
            id="contentInput"
            placeholder={!user ? "You must be logged in to post." : "Write about something here..."}
            multiline
            rows={15}
            className={classes.content}
            onChange={e => mutState({
              title: postState.title,
              content: e.target.value
            })}
          />
          <br />
          <Button type="submit" variant="contained" color="primary" disabled={!user} className={classes.button}>
            Post <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const NewPostFormMutation = (props: NewPostFormPropTypes) => {
  const [mutateFn, { loading, error }] = useMutation<CreatePostReturnType>(
    createPost,
    {
      update: (cache, { data }) => {
        let posts = cache.readQuery<Array<PostModel>>({ query: postsQuery });
        if (!posts) {
          posts = [];
        }
        if (data !== undefined && data !== null) {
          posts.push({ ...data });
          cache.writeQuery({
            query: postsQuery,
            data: {
              posts
            }
          });
        }
      }
    }
  );
  if (loading) return <Typography variant="h5" >Loading...</Typography>;
  if (error) {
    console.error(error);
    return <Typography variant="h5" >Error creating post. {error.message}</Typography>;
  }
  return <NewPostForm onSubmit={(evt) => mutateFn({ variables: { postInput: evt } })} classes={props.classes} />;
};

const NewPost = withStyles(styles)(NewPostFormMutation);

export { NewPost };
