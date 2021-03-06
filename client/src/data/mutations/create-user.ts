import gql from "graphql-tag";

export const createUser = gql`
mutation createUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    id username email
  }
}
`;

export interface CreateUserInput {
  id: string;
  username: string;
  email: string;
}

export interface CreateUserOutput {
  createUser: CreateUserInput;
}