import { gql } from "@apollo/client";

export const CREATE_CONTENT_MUTATION = gql`
  mutation SubmitContent($input: SubmitContentInput!) {
    submitContent(input: $input) {
      success
      ContentItem {
        id
        title
        status
        submittedAt
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateContentStatus($input: UpdateContentStatusInput!) {
    updateContentStatus(input: $input) {
      success
      message
      ContentItem {
        id
        status
      }
    }
  }
`;

