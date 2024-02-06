import gql from "graphql-tag";

export const listMyQuery = gql`
  query MyQuery {
    listMyCustomTypes {
      nextToken
      items {
        content
        id
        title
      }
    }
  }
`;
