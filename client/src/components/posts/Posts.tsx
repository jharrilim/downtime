import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';
import { traceOrDate } from '../../util/time';
import { Typography } from '@material-ui/core';

interface Post {
  id: string;
  content: string;
  dateCreated: string;
  title: string;
  author: {
    username: string;
  };
}

interface Response {
  posts: Post[];
}

const postQuery = gql` {
  posts {
    id content title dateCreated author {
      username
    }
  }
}`;

const Posts = () => (
  <Query<Response> query={postQuery}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.error(error);
        return <p>Error loading content.</p>;
      }
      if (data!.posts.length <= 0)
        return <Typography variant="headline">
          There are currently no posts yet. Click the post button on the left to be the first!
        </Typography>;
      
        return data!.posts.map(({ content, author, dateCreated, title }) => (
          <Post 
            content={content} 
            author={author.username} 
            title={title} 
            date={traceOrDate(new Date(dateCreated))()}/>
        ));
    }}
  </Query>
);

export { Posts };
