import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Post } from './Post';
import { traceOrDate } from '../../util/time';
import { Typography, Grid } from '@material-ui/core';
import { postsQuery } from '../../data/queries/posts';
import { PostModel } from '../../data/models/Post.model';
import moment from 'moment';
import { OperationVariables } from 'apollo-boost';

interface Response {
  posts: PostModel[];
}

const queryResultHandler = async (
  { loading, error, data }: QueryResult<Response, OperationVariables>
): Promise<JSX.Element> => {
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading content.</p>;
  }
  if (data!.posts.length <= 0)
    return (
      <Typography variant="h4">
        There are currently no posts yet. Click the post button on the left to be the first!
      </Typography>
    );

  return (
    <Grid container spacing={24}>
      {data!.posts.sort((a, b) => -moment(a.dateCreated).diff(b.dateCreated)).map(({ content, author, dateCreated, title }) => (
        <Grid item lg={6} sm={12}>
          <Post
            key={`${author.username}-${title}`}
            content={content}
            author={author.username}
            title={title}
            date={traceOrDate(new Date(dateCreated!))()} />
        </Grid>
      ))}
    </Grid>
  );
}

const Posts = () => (
  <Query<Response> query={postsQuery} fetchPolicy="cache-and-network">
    {queryResultHandler}
  </Query>
);

export { Posts };
