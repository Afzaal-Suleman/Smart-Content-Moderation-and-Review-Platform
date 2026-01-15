import { gql } from "@apollo/client";

export const CONTENTS_QUERY = gql`
  query Contents {
    contents {
      id
      title
      description
      contentUrl
      contentType
      status
      reviewComments
      rejectionReason
      submittedAt
      reviewedAt
      priority
      assignedModerator {
        id
        username
        email
        phonenumber
      }
      submittedBy {
        id
        username
        email
        phonenumber
      }
    }
  }
`;

export const CONTENTS_QUERY_ID = gql`
query ContentByUser {
  contentByUser {
    id
    title
    description
    contentUrl
    contentType
    status
    submittedBy {
      id
      username
      email
      phonenumber
    }
    assignedModerator {
      id
      username
      email
      phonenumber
    }
    reviewComments
    rejectionReason
    submittedAt
    reviewedAt
    priority
  }
}
  `;


export const APPROVED_CONTENT_QUERY = gql`
query ApprovedContent {
  approvedContent {
    id
    title
    description
    contentUrl
    contentType
    status
    submittedBy {
      id
      username
      email
      phonenumber
    }
    assignedModerator {
      id
      username
      email
      phonenumber
    }
    reviewComments
    rejectionReason
    submittedAt
    reviewedAt
    priority
  }
}
`;

export const GET_CONTENT_BY_ID = gql`
 query Content($contentId: ID!) {
  content(id: $contentId) {
    id
    title
    description
    contentUrl
    contentType
    status
    submittedBy {
      id
      username
      email
      phonenumber
      role
    }
    assignedModerator {
      id
      username
      email
      phonenumber
      role
    }
    reviewComments
    rejectionReason
    submittedAt
    reviewedAt
    priority
  }
}
`;
