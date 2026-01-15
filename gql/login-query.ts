import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LogIn($input: LoginInput!) {
    logIn(input: $input) {
      user {
        username
        phonenumber
        email
        role
      }
      token
      success
    }
  }
`;

export const CHECK_AUTH = gql`
mutation CheckAuth {
  checkAuth {
    success
    token
    user {
      id
      username
      email
      phonenumber
      role
    }
  }
}
`;
