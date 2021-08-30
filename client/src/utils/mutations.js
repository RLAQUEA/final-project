
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SOUND = gql`
mutation addSound($name: String!, $length: Number!, $tags: String!, $link: String!) {
    addSound(name: $name, length: $length, tags: $tags, link: $link) {
      sound {
        _id
        name
        length
        link
      }
    }
  }
`;

