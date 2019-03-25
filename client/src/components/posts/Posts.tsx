import React from 'react';
import { Query } from 'react-apollo';
import { Post } from './Post';
import { traceOrDate } from '../../util/time';
import { Typography, Grid } from '@material-ui/core';
import { postsQuery } from '../../data/queries/posts';
import { PostModel } from '../../data/models/Post.model';

interface Response {
  posts: PostModel[];
}

const Posts = () => (
  <Query<Response> query={postsQuery} >
    {({ loading, error, data }) => {

      if (loading) return <p>Loading...</p>;
      if (error) {
        console.error(error);
        return <p>Error loading content.</p>;
      }
      if (data!.posts.length <= 0)
        return (
          <Typography variant="headline">
            There are currently no posts yet. Click the post button on the left to be the first!
          </Typography>
        );

      return (
        <Grid container spacing={24}>
          {data!.posts.map(({ content, author, dateCreated, title }) => (
              <Grid item>
                <Post
                  content={content}
                  author={author.username}
                  title={title}
                  date={traceOrDate(new Date(dateCreated!))()} />
              </Grid>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export { Posts };
