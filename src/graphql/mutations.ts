/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createScanEvent = /* GraphQL */ `mutation CreateScanEvent(
  $input: CreateScanEventInput!
  $condition: ModelScanEventConditionInput
) {
  createScanEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateScanEventMutationVariables,
  APITypes.CreateScanEventMutation
>;
export const updateScanEvent = /* GraphQL */ `mutation UpdateScanEvent(
  $input: UpdateScanEventInput!
  $condition: ModelScanEventConditionInput
) {
  updateScanEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateScanEventMutationVariables,
  APITypes.UpdateScanEventMutation
>;
export const deleteScanEvent = /* GraphQL */ `mutation DeleteScanEvent(
  $input: DeleteScanEventInput!
  $condition: ModelScanEventConditionInput
) {
  deleteScanEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteScanEventMutationVariables,
  APITypes.DeleteScanEventMutation
>;
export const createResolution = /* GraphQL */ `mutation CreateResolution(
  $input: CreateResolutionInput!
  $condition: ModelResolutionConditionInput
) {
  createResolution(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateResolutionMutationVariables,
  APITypes.CreateResolutionMutation
>;
export const updateResolution = /* GraphQL */ `mutation UpdateResolution(
  $input: UpdateResolutionInput!
  $condition: ModelResolutionConditionInput
) {
  updateResolution(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateResolutionMutationVariables,
  APITypes.UpdateResolutionMutation
>;
export const deleteResolution = /* GraphQL */ `mutation DeleteResolution(
  $input: DeleteResolutionInput!
  $condition: ModelResolutionConditionInput
) {
  deleteResolution(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteResolutionMutationVariables,
  APITypes.DeleteResolutionMutation
>;
export const createPractice = /* GraphQL */ `mutation CreatePractice(
  $input: CreatePracticeInput!
  $condition: ModelPracticeConditionInput
) {
  createPractice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePracticeMutationVariables,
  APITypes.CreatePracticeMutation
>;
export const updatePractice = /* GraphQL */ `mutation UpdatePractice(
  $input: UpdatePracticeInput!
  $condition: ModelPracticeConditionInput
) {
  updatePractice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePracticeMutationVariables,
  APITypes.UpdatePracticeMutation
>;
export const deletePractice = /* GraphQL */ `mutation DeletePractice(
  $input: DeletePracticeInput!
  $condition: ModelPracticeConditionInput
) {
  deletePractice(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePracticeMutationVariables,
  APITypes.DeletePracticeMutation
>;
export const createBoletin = /* GraphQL */ `mutation CreateBoletin(
  $input: CreateBoletinInput!
  $condition: ModelBoletinConditionInput
) {
  createBoletin(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBoletinMutationVariables,
  APITypes.CreateBoletinMutation
>;
export const updateBoletin = /* GraphQL */ `mutation UpdateBoletin(
  $input: UpdateBoletinInput!
  $condition: ModelBoletinConditionInput
) {
  updateBoletin(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBoletinMutationVariables,
  APITypes.UpdateBoletinMutation
>;
export const deleteBoletin = /* GraphQL */ `mutation DeleteBoletin(
  $input: DeleteBoletinInput!
  $condition: ModelBoletinConditionInput
) {
  deleteBoletin(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBoletinMutationVariables,
  APITypes.DeleteBoletinMutation
>;
export const createSiteConfig = /* GraphQL */ `mutation CreateSiteConfig(
  $input: CreateSiteConfigInput!
  $condition: ModelSiteConfigConditionInput
) {
  createSiteConfig(input: $input, condition: $condition) {
    id
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSiteConfigMutationVariables,
  APITypes.CreateSiteConfigMutation
>;
export const updateSiteConfig = /* GraphQL */ `mutation UpdateSiteConfig(
  $input: UpdateSiteConfigInput!
  $condition: ModelSiteConfigConditionInput
) {
  updateSiteConfig(input: $input, condition: $condition) {
    id
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSiteConfigMutationVariables,
  APITypes.UpdateSiteConfigMutation
>;
export const deleteSiteConfig = /* GraphQL */ `mutation DeleteSiteConfig(
  $input: DeleteSiteConfigInput!
  $condition: ModelSiteConfigConditionInput
) {
  deleteSiteConfig(input: $input, condition: $condition) {
    id
    value
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSiteConfigMutationVariables,
  APITypes.DeleteSiteConfigMutation
>;
export const createNoticia = /* GraphQL */ `mutation CreateNoticia(
  $input: CreateNoticiaInput!
  $condition: ModelNoticiaConditionInput
) {
  createNoticia(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNoticiaMutationVariables,
  APITypes.CreateNoticiaMutation
>;
export const updateNoticia = /* GraphQL */ `mutation UpdateNoticia(
  $input: UpdateNoticiaInput!
  $condition: ModelNoticiaConditionInput
) {
  updateNoticia(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNoticiaMutationVariables,
  APITypes.UpdateNoticiaMutation
>;
export const deleteNoticia = /* GraphQL */ `mutation DeleteNoticia(
  $input: DeleteNoticiaInput!
  $condition: ModelNoticiaConditionInput
) {
  deleteNoticia(input: $input, condition: $condition) {
    id
    title
    date
    s3Key
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNoticiaMutationVariables,
  APITypes.DeleteNoticiaMutation
>;
export const createAdminLog = /* GraphQL */ `mutation CreateAdminLog(
  $input: CreateAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  createAdminLog(input: $input, condition: $condition) {
    id
    adminSub
    adminName
    action
    resourceType
    resourceTitle
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdminLogMutationVariables,
  APITypes.CreateAdminLogMutation
>;
export const updateAdminLog = /* GraphQL */ `mutation UpdateAdminLog(
  $input: UpdateAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  updateAdminLog(input: $input, condition: $condition) {
    id
    adminSub
    adminName
    action
    resourceType
    resourceTitle
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdminLogMutationVariables,
  APITypes.UpdateAdminLogMutation
>;
export const deleteAdminLog = /* GraphQL */ `mutation DeleteAdminLog(
  $input: DeleteAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  deleteAdminLog(input: $input, condition: $condition) {
    id
    adminSub
    adminName
    action
    resourceType
    resourceTitle
    timestamp
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdminLogMutationVariables,
  APITypes.DeleteAdminLogMutation
>;
export const createPracticeCheckIn = /* GraphQL */ `mutation CreatePracticeCheckIn(
  $input: CreatePracticeCheckInInput!
  $condition: ModelPracticeCheckInConditionInput
) {
  createPracticeCheckIn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePracticeCheckInMutationVariables,
  APITypes.CreatePracticeCheckInMutation
>;
export const updatePracticeCheckIn = /* GraphQL */ `mutation UpdatePracticeCheckIn(
  $input: UpdatePracticeCheckInInput!
  $condition: ModelPracticeCheckInConditionInput
) {
  updatePracticeCheckIn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePracticeCheckInMutationVariables,
  APITypes.UpdatePracticeCheckInMutation
>;
export const deletePracticeCheckIn = /* GraphQL */ `mutation DeletePracticeCheckIn(
  $input: DeletePracticeCheckInInput!
  $condition: ModelPracticeCheckInConditionInput
) {
  deletePracticeCheckIn(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePracticeCheckInMutationVariables,
  APITypes.DeletePracticeCheckInMutation
>;
