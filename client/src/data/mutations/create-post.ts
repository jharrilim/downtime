import gql from "graphql-tag";

export const createPost = gql`
    mutation createPost($postInput: PostInput!) {
    createPost(postInput: $postInput) {
        content title dateCreated author {
        username
        }
    }
    }
`;

export interface CreatePostReturnType {
    content: string;
    title: string;
    dateCreated: string;
    author: {
        username: string;
    };
}
