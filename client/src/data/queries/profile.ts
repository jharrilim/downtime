import gql from "graphql-tag";

export const profileQuery = gql`
  query {
      profile {
          username email roles { name }
      }
  }
`;

export interface ProfileQueryResponse {
  profile: {
    username: string;
    email: string;
    roles: { name: string }[];
  };
}
