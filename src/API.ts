/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  nombre: string,
  apellido: string,
  correo: string,
  telefono?: string | null,
  fechaNacimiento?: string | null,
  sexo?: string | null,
  cedula?: string | null,
  permiso?: string | null,
  estatus?: string | null,
  qrKey?: string | null,
  qrPayload?: string | null,
  avatarKey?: string | null,
};

export type ModelUserConditionInput = {
  nombre?: ModelStringInput | null,
  apellido?: ModelStringInput | null,
  correo?: ModelStringInput | null,
  telefono?: ModelStringInput | null,
  fechaNacimiento?: ModelStringInput | null,
  sexo?: ModelStringInput | null,
  cedula?: ModelStringInput | null,
  permiso?: ModelStringInput | null,
  estatus?: ModelStringInput | null,
  qrKey?: ModelStringInput | null,
  qrPayload?: ModelStringInput | null,
  avatarKey?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  nombre: string,
  apellido: string,
  correo: string,
  telefono?: string | null,
  fechaNacimiento?: string | null,
  sexo?: string | null,
  cedula?: string | null,
  permiso?: string | null,
  estatus?: string | null,
  qrKey?: string | null,
  qrPayload?: string | null,
  avatarKey?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  nombre?: string | null,
  apellido?: string | null,
  correo?: string | null,
  telefono?: string | null,
  fechaNacimiento?: string | null,
  sexo?: string | null,
  cedula?: string | null,
  permiso?: string | null,
  estatus?: string | null,
  qrKey?: string | null,
  qrPayload?: string | null,
  avatarKey?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateScanEventInput = {
  id?: string | null,
  userId: string,
  timestamp: string,
  scannerSub?: string | null,
  scannerName?: string | null,
  location?: string | null,
};

export type ModelScanEventConditionInput = {
  userId?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  scannerSub?: ModelStringInput | null,
  scannerName?: ModelStringInput | null,
  location?: ModelStringInput | null,
  and?: Array< ModelScanEventConditionInput | null > | null,
  or?: Array< ModelScanEventConditionInput | null > | null,
  not?: ModelScanEventConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ScanEvent = {
  __typename: "ScanEvent",
  id: string,
  userId: string,
  timestamp: string,
  scannerSub?: string | null,
  scannerName?: string | null,
  location?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateScanEventInput = {
  id: string,
  userId?: string | null,
  timestamp?: string | null,
  scannerSub?: string | null,
  scannerName?: string | null,
  location?: string | null,
};

export type DeleteScanEventInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  nombre?: ModelStringInput | null,
  apellido?: ModelStringInput | null,
  correo?: ModelStringInput | null,
  telefono?: ModelStringInput | null,
  fechaNacimiento?: ModelStringInput | null,
  sexo?: ModelStringInput | null,
  cedula?: ModelStringInput | null,
  permiso?: ModelStringInput | null,
  estatus?: ModelStringInput | null,
  qrKey?: ModelStringInput | null,
  qrPayload?: ModelStringInput | null,
  avatarKey?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelScanEventFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  scannerSub?: ModelStringInput | null,
  scannerName?: ModelStringInput | null,
  location?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelScanEventFilterInput | null > | null,
  or?: Array< ModelScanEventFilterInput | null > | null,
  not?: ModelScanEventFilterInput | null,
};

export type ModelScanEventConnection = {
  __typename: "ModelScanEventConnection",
  items:  Array<ScanEvent | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  nombre?: ModelSubscriptionStringInput | null,
  apellido?: ModelSubscriptionStringInput | null,
  correo?: ModelSubscriptionStringInput | null,
  telefono?: ModelSubscriptionStringInput | null,
  fechaNacimiento?: ModelSubscriptionStringInput | null,
  sexo?: ModelSubscriptionStringInput | null,
  cedula?: ModelSubscriptionStringInput | null,
  permiso?: ModelSubscriptionStringInput | null,
  estatus?: ModelSubscriptionStringInput | null,
  qrKey?: ModelSubscriptionStringInput | null,
  qrPayload?: ModelSubscriptionStringInput | null,
  avatarKey?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionScanEventFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  scannerSub?: ModelSubscriptionStringInput | null,
  scannerName?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionScanEventFilterInput | null > | null,
  or?: Array< ModelSubscriptionScanEventFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateScanEventMutationVariables = {
  input: CreateScanEventInput,
  condition?: ModelScanEventConditionInput | null,
};

export type CreateScanEventMutation = {
  createScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateScanEventMutationVariables = {
  input: UpdateScanEventInput,
  condition?: ModelScanEventConditionInput | null,
};

export type UpdateScanEventMutation = {
  updateScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteScanEventMutationVariables = {
  input: DeleteScanEventInput,
  condition?: ModelScanEventConditionInput | null,
};

export type DeleteScanEventMutation = {
  deleteScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      nombre: string,
      apellido: string,
      correo: string,
      telefono?: string | null,
      fechaNacimiento?: string | null,
      sexo?: string | null,
      cedula?: string | null,
      permiso?: string | null,
      estatus?: string | null,
      qrKey?: string | null,
      qrPayload?: string | null,
      avatarKey?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetScanEventQueryVariables = {
  id: string,
};

export type GetScanEventQuery = {
  getScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListScanEventsQueryVariables = {
  filter?: ModelScanEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScanEventsQuery = {
  listScanEvents?:  {
    __typename: "ModelScanEventConnection",
    items:  Array< {
      __typename: "ScanEvent",
      id: string,
      userId: string,
      timestamp: string,
      scannerSub?: string | null,
      scannerName?: string | null,
      location?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ScanEventsByUserIdAndTimestampQueryVariables = {
  userId: string,
  timestamp?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScanEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ScanEventsByUserIdAndTimestampQuery = {
  scanEventsByUserIdAndTimestamp?:  {
    __typename: "ModelScanEventConnection",
    items:  Array< {
      __typename: "ScanEvent",
      id: string,
      userId: string,
      timestamp: string,
      scannerSub?: string | null,
      scannerName?: string | null,
      location?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    nombre: string,
    apellido: string,
    correo: string,
    telefono?: string | null,
    fechaNacimiento?: string | null,
    sexo?: string | null,
    cedula?: string | null,
    permiso?: string | null,
    estatus?: string | null,
    qrKey?: string | null,
    qrPayload?: string | null,
    avatarKey?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateScanEventSubscriptionVariables = {
  filter?: ModelSubscriptionScanEventFilterInput | null,
};

export type OnCreateScanEventSubscription = {
  onCreateScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateScanEventSubscriptionVariables = {
  filter?: ModelSubscriptionScanEventFilterInput | null,
};

export type OnUpdateScanEventSubscription = {
  onUpdateScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteScanEventSubscriptionVariables = {
  filter?: ModelSubscriptionScanEventFilterInput | null,
};

export type OnDeleteScanEventSubscription = {
  onDeleteScanEvent?:  {
    __typename: "ScanEvent",
    id: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    location?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
