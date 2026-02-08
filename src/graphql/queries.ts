/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    nombre
    apellido
    correo
    telefono
    fechaNacimiento
    sexo
    cedula
    permiso
    estatus
    qrKey
    qrPayload
    avatarKey
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      nombre
      apellido
      correo
      telefono
      fechaNacimiento
      sexo
      cedula
      permiso
      estatus
      qrKey
      qrPayload
      avatarKey
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getScanEvent = /* GraphQL */ `query GetScanEvent($id: ID!) {
  getScanEvent(id: $id) {
    id
    userId
    timestamp
    scannerSub
    scannerName
    location
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetScanEventQueryVariables,
  APITypes.GetScanEventQuery
>;
export const listScanEvents = /* GraphQL */ `query ListScanEvents(
  $filter: ModelScanEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listScanEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      timestamp
      scannerSub
      scannerName
      location
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScanEventsQueryVariables,
  APITypes.ListScanEventsQuery
>;
export const getResolution = /* GraphQL */ `query GetResolution($id: ID!) {
  getResolution(id: $id) {
    id
    pk
    date
    title
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetResolutionQueryVariables,
  APITypes.GetResolutionQuery
>;
export const listResolutions = /* GraphQL */ `query ListResolutions(
  $filter: ModelResolutionFilterInput
  $limit: Int
  $nextToken: String
) {
  listResolutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      pk
      date
      title
      s3Key
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListResolutionsQueryVariables,
  APITypes.ListResolutionsQuery
>;
export const getPractice = /* GraphQL */ `query GetPractice($id: ID!) {
  getPractice(id: $id) {
    id
    title
    date
    startTime
    location
    notes
    status
    qrToken
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPracticeQueryVariables,
  APITypes.GetPracticeQuery
>;
export const listPractices = /* GraphQL */ `query ListPractices(
  $filter: ModelPracticeFilterInput
  $limit: Int
  $nextToken: String
) {
  listPractices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      date
      startTime
      location
      notes
      status
      qrToken
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPracticesQueryVariables,
  APITypes.ListPracticesQuery
>;
export const getPracticeCheckIn = /* GraphQL */ `query GetPracticeCheckIn($id: ID!) {
  getPracticeCheckIn(id: $id) {
    id
    practiceId
    userId
    timestamp
    scannerSub
    scannerName
    method
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPracticeCheckInQueryVariables,
  APITypes.GetPracticeCheckInQuery
>;
export const listPracticeCheckIns = /* GraphQL */ `query ListPracticeCheckIns(
  $filter: ModelPracticeCheckInFilterInput
  $limit: Int
  $nextToken: String
) {
  listPracticeCheckIns(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      practiceId
      userId
      timestamp
      scannerSub
      scannerName
      method
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPracticeCheckInsQueryVariables,
  APITypes.ListPracticeCheckInsQuery
>;
export const scanEventsByUserIdAndTimestamp = /* GraphQL */ `query ScanEventsByUserIdAndTimestamp(
  $userId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelScanEventFilterInput
  $limit: Int
  $nextToken: String
) {
  scanEventsByUserIdAndTimestamp(
    userId: $userId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      timestamp
      scannerSub
      scannerName
      location
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ScanEventsByUserIdAndTimestampQueryVariables,
  APITypes.ScanEventsByUserIdAndTimestampQuery
>;
export const resolutionsByPkAndDate = /* GraphQL */ `query ResolutionsByPkAndDate(
  $pk: String!
  $date: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelResolutionFilterInput
  $limit: Int
  $nextToken: String
) {
  resolutionsByPkAndDate(
    pk: $pk
    date: $date
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      pk
      date
      title
      s3Key
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ResolutionsByPkAndDateQueryVariables,
  APITypes.ResolutionsByPkAndDateQuery
>;
export const practiceByQrToken = /* GraphQL */ `query PracticeByQrToken(
  $qrToken: String!
  $sortDirection: ModelSortDirection
  $filter: ModelPracticeFilterInput
  $limit: Int
  $nextToken: String
) {
  practiceByQrToken(
    qrToken: $qrToken
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      date
      startTime
      location
      notes
      status
      qrToken
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PracticeByQrTokenQueryVariables,
  APITypes.PracticeByQrTokenQuery
>;
export const practiceCheckInsByPracticeIdAndTimestamp = /* GraphQL */ `query PracticeCheckInsByPracticeIdAndTimestamp(
  $practiceId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPracticeCheckInFilterInput
  $limit: Int
  $nextToken: String
) {
  practiceCheckInsByPracticeIdAndTimestamp(
    practiceId: $practiceId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      practiceId
      userId
      timestamp
      scannerSub
      scannerName
      method
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PracticeCheckInsByPracticeIdAndTimestampQueryVariables,
  APITypes.PracticeCheckInsByPracticeIdAndTimestampQuery
>;
export const practiceCheckInsByUserIdAndTimestamp = /* GraphQL */ `query PracticeCheckInsByUserIdAndTimestamp(
  $userId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPracticeCheckInFilterInput
  $limit: Int
  $nextToken: String
) {
  practiceCheckInsByUserIdAndTimestamp(
    userId: $userId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      practiceId
      userId
      timestamp
      scannerSub
      scannerName
      method
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PracticeCheckInsByUserIdAndTimestampQueryVariables,
  APITypes.PracticeCheckInsByUserIdAndTimestampQuery
>;
