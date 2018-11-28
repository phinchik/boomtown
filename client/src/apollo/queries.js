import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    description
    timedate
    tags {
      id
      title
    }
    borrower {
      id
    }
    owner {
      id
      fullname
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($filter: ID!) {
    ...ItemFields
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query item($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($filter: ID!) {
    user(id: $filter) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation user($user: NewUserInput!) {
    signup(user: $user) {
      fullname
      email
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($NewItemInput: NewItemInput!) {
    addItem(item: $NewItemInput) {
      title
      description
    }
  }
`;

export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      fullname
      email
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation user($user: NewUserInput!) {
    signup(user: $user) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation user($user: logIn!) {
    login(user: $user) {
      id
      fullname
    }
  }
`;

//
