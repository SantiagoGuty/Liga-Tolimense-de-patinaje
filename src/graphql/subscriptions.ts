/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateScanEvent = /* GraphQL */ `subscription OnCreateScanEvent($filter: ModelSubscriptionScanEventFilterInput) {
  onCreateScanEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateScanEventSubscriptionVariables,
  APITypes.OnCreateScanEventSubscription
>;
export const onUpdateScanEvent = /* GraphQL */ `subscription OnUpdateScanEvent($filter: ModelSubscriptionScanEventFilterInput) {
  onUpdateScanEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateScanEventSubscriptionVariables,
  APITypes.OnUpdateScanEventSubscription
>;
export const onDeleteScanEvent = /* GraphQL */ `subscription OnDeleteScanEvent($filter: ModelSubscriptionScanEventFilterInput) {
  onDeleteScanEvent(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteScanEventSubscriptionVariables,
  APITypes.OnDeleteScanEventSubscription
>;
export const onCreateResolution = /* GraphQL */ `subscription OnCreateResolution(
  $filter: ModelSubscriptionResolutionFilterInput
) {
  onCreateResolution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateResolutionSubscriptionVariables,
  APITypes.OnCreateResolutionSubscription
>;
export const onUpdateResolution = /* GraphQL */ `subscription OnUpdateResolution(
  $filter: ModelSubscriptionResolutionFilterInput
) {
  onUpdateResolution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateResolutionSubscriptionVariables,
  APITypes.OnUpdateResolutionSubscription
>;
export const onDeleteResolution = /* GraphQL */ `subscription OnDeleteResolution(
  $filter: ModelSubscriptionResolutionFilterInput
) {
  onDeleteResolution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteResolutionSubscriptionVariables,
  APITypes.OnDeleteResolutionSubscription
>;
export const onCreatePractice = /* GraphQL */ `subscription OnCreatePractice(
  $filter: ModelSubscriptionPracticeFilterInput
  $owner: String
) {
  onCreatePractice(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePracticeSubscriptionVariables,
  APITypes.OnCreatePracticeSubscription
>;
export const onUpdatePractice = /* GraphQL */ `subscription OnUpdatePractice(
  $filter: ModelSubscriptionPracticeFilterInput
  $owner: String
) {
  onUpdatePractice(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePracticeSubscriptionVariables,
  APITypes.OnUpdatePracticeSubscription
>;
export const onDeletePractice = /* GraphQL */ `subscription OnDeletePractice(
  $filter: ModelSubscriptionPracticeFilterInput
  $owner: String
) {
  onDeletePractice(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePracticeSubscriptionVariables,
  APITypes.OnDeletePracticeSubscription
>;
export const onCreatePracticeCheckIn = /* GraphQL */ `subscription OnCreatePracticeCheckIn(
  $filter: ModelSubscriptionPracticeCheckInFilterInput
  $owner: String
) {
  onCreatePracticeCheckIn(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePracticeCheckInSubscriptionVariables,
  APITypes.OnCreatePracticeCheckInSubscription
>;
export const onUpdatePracticeCheckIn = /* GraphQL */ `subscription OnUpdatePracticeCheckIn(
  $filter: ModelSubscriptionPracticeCheckInFilterInput
  $owner: String
) {
  onUpdatePracticeCheckIn(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePracticeCheckInSubscriptionVariables,
  APITypes.OnUpdatePracticeCheckInSubscription
>;
export const onDeletePracticeCheckIn = /* GraphQL */ `subscription OnDeletePracticeCheckIn(
  $filter: ModelSubscriptionPracticeCheckInFilterInput
  $owner: String
) {
  onDeletePracticeCheckIn(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePracticeCheckInSubscriptionVariables,
  APITypes.OnDeletePracticeCheckInSubscription
>;
