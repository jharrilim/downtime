import gql from "graphql-tag";

export const signIn = gql`
  mutation signIn($signInInput: SignInInput!) {
    createUser(signInInput: $signInInput) {
      id username email
    }
  }
`;

export interface SignInInput {
  usernameOrEmail: string;
  password: string;
}
