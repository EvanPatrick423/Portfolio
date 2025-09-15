import { gql } from '@apollo/client';

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: ContactInput!) {
    submitContact(input: $input) {
      id
      name
      email
      subject
      message
      submittedAt
      status
    }
  }
`;
