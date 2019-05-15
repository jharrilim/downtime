import gql from "graphql-tag";

export const verifyToken = gql`
    mutation signIn($validateTokenInput: ValidateTokenInput!) {
        validateToken(validateTokenInput: $validateTokenInput)
    }
`;

export interface SignInInput {
  token: string
}
