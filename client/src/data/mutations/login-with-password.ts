import gql from "graphql-tag";

export const loginWithPassword = gql`
  mutation loginWithPassword($loginWithPasswordInput: LoginWithPasswordInput!){
    loginWithPassword(loginWithPasswordInput: $loginWithPasswordInput)
  }
`;

export interface LoginWithPasswordInput {
  usernameOrEmail: string;
  password: string;
}

export interface LoginWithPasswordResponse {
  loginWithPassword: string;
}