import gql from "graphql-tag";

export const signIn = gql`
  mutation loginWithPassword($loginWithPasswordInput: LoginWithPasswordInput!){
    loginWithPassword(loginWithPasswordInput: $loginWithPasswordInput)
  }
`;

export interface LoginWithPasswordInput {
  usernameOrEmail: string;
  password: string;
}
