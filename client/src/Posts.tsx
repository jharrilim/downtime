import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';

interface Post {
  id: string;
  content: string;
  author: {
    email: string;
  };
}

interface Response {
  posts: Post[];
}


const Posts = () => (
  <Query<Response>
    query={gql`
      {
        posts {
          id content author {
            email
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.error(error);
        return <p>Error loading content.</p>;
      }
      return data!.posts.map(({ content, author }) => (
        <Post content={content} title={author.email}></Post>
      ));
    }}
  </Query>
);

export { Posts };