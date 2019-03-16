import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';
import { traceOrDate } from './time';

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


const Posts = () => (
  <Query<Response>
    query={gql`
      {
        posts {
          id content title dateCreated author {
            username
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
      return data!.posts.map(({ content, author, dateCreated, title }) => (
        <Post content={content} author={author.username} title={title} date={ traceOrDate(new Date(dateCreated))() }/>
      ));
    }}
  </Query>
);

export { Posts };
