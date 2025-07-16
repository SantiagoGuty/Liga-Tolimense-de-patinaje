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
    qrCodeUrl
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
    qrCodeUrl
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
    qrCodeUrl
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteScanEventMutationVariables,
  APITypes.DeleteScanEventMutation
>;
