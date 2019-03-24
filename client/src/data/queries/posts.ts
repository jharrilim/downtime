import gql from "graphql-tag";

export const postsQuery = gql` {
    posts {
      id content title dateCreated author {
        username
      }
    }
}`;
