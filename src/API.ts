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

export type CreateResolutionInput = {
  id?: string | null,
  pk: string,
  date: string,
  title: string,
  s3Key: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelResolutionConditionInput = {
  pk?: ModelStringInput | null,
  date?: ModelStringInput | null,
  title?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelResolutionConditionInput | null > | null,
  or?: Array< ModelResolutionConditionInput | null > | null,
  not?: ModelResolutionConditionInput | null,
};

export type Resolution = {
  __typename: "Resolution",
  id: string,
  pk: string,
  date: string,
  title: string,
  s3Key: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateResolutionInput = {
  id: string,
  pk?: string | null,
  date?: string | null,
  title?: string | null,
  s3Key?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteResolutionInput = {
  id: string,
};

export type CreatePracticeInput = {
  id?: string | null,
  title: string,
  date: string,
  startTime?: string | null,
  location?: string | null,
  notes?: string | null,
  status?: string | null,
  qrToken: string,
};

export type ModelPracticeConditionInput = {
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  location?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  status?: ModelStringInput | null,
  qrToken?: ModelStringInput | null,
  and?: Array< ModelPracticeConditionInput | null > | null,
  or?: Array< ModelPracticeConditionInput | null > | null,
  not?: ModelPracticeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Practice = {
  __typename: "Practice",
  id: string,
  title: string,
  date: string,
  startTime?: string | null,
  location?: string | null,
  notes?: string | null,
  status?: string | null,
  qrToken: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePracticeInput = {
  id: string,
  title?: string | null,
  date?: string | null,
  startTime?: string | null,
  location?: string | null,
  notes?: string | null,
  status?: string | null,
  qrToken?: string | null,
};

export type DeletePracticeInput = {
  id: string,
};

export type CreateBoletinInput = {
  id?: string | null,
  title: string,
  date: string,
  s3Key: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelBoletinConditionInput = {
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBoletinConditionInput | null > | null,
  or?: Array< ModelBoletinConditionInput | null > | null,
  not?: ModelBoletinConditionInput | null,
};

export type Boletin = {
  __typename: "Boletin",
  id: string,
  title: string,
  date: string,
  s3Key: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBoletinInput = {
  id: string,
  title?: string | null,
  date?: string | null,
  s3Key?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteBoletinInput = {
  id: string,
};

export type CreateSiteConfigInput = {
  id?: string | null,
  value: string,
};

export type ModelSiteConfigConditionInput = {
  value?: ModelStringInput | null,
  and?: Array< ModelSiteConfigConditionInput | null > | null,
  or?: Array< ModelSiteConfigConditionInput | null > | null,
  not?: ModelSiteConfigConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type SiteConfig = {
  __typename: "SiteConfig",
  id: string,
  value: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSiteConfigInput = {
  id: string,
  value?: string | null,
};

export type DeleteSiteConfigInput = {
  id: string,
};

export type CreateNoticiaInput = {
  id?: string | null,
  title: string,
  date: string,
  s3Key: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelNoticiaConditionInput = {
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoticiaConditionInput | null > | null,
  or?: Array< ModelNoticiaConditionInput | null > | null,
  not?: ModelNoticiaConditionInput | null,
};

export type Noticia = {
  __typename: "Noticia",
  id: string,
  title: string,
  date: string,
  s3Key: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNoticiaInput = {
  id: string,
  title?: string | null,
  date?: string | null,
  s3Key?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteNoticiaInput = {
  id: string,
};

export type CreateAdminLogInput = {
  id?: string | null,
  adminSub: string,
  adminName: string,
  action: string,
  resourceType: string,
  resourceTitle?: string | null,
  timestamp: string,
};

export type ModelAdminLogConditionInput = {
  adminSub?: ModelStringInput | null,
  adminName?: ModelStringInput | null,
  action?: ModelStringInput | null,
  resourceType?: ModelStringInput | null,
  resourceTitle?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  and?: Array< ModelAdminLogConditionInput | null > | null,
  or?: Array< ModelAdminLogConditionInput | null > | null,
  not?: ModelAdminLogConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type AdminLog = {
  __typename: "AdminLog",
  id: string,
  adminSub: string,
  adminName: string,
  action: string,
  resourceType: string,
  resourceTitle?: string | null,
  timestamp: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAdminLogInput = {
  id: string,
  adminSub?: string | null,
  adminName?: string | null,
  action?: string | null,
  resourceType?: string | null,
  resourceTitle?: string | null,
  timestamp?: string | null,
};

export type DeleteAdminLogInput = {
  id: string,
};

export type CreatePracticeCheckInInput = {
  id?: string | null,
  practiceId: string,
  userId: string,
  timestamp: string,
  scannerSub?: string | null,
  scannerName?: string | null,
  method?: string | null,
};

export type ModelPracticeCheckInConditionInput = {
  practiceId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  scannerSub?: ModelStringInput | null,
  scannerName?: ModelStringInput | null,
  method?: ModelStringInput | null,
  and?: Array< ModelPracticeCheckInConditionInput | null > | null,
  or?: Array< ModelPracticeCheckInConditionInput | null > | null,
  not?: ModelPracticeCheckInConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type PracticeCheckIn = {
  __typename: "PracticeCheckIn",
  id: string,
  practiceId: string,
  userId: string,
  timestamp: string,
  scannerSub?: string | null,
  scannerName?: string | null,
  method?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePracticeCheckInInput = {
  id: string,
  practiceId?: string | null,
  userId?: string | null,
  timestamp?: string | null,
  scannerSub?: string | null,
  scannerName?: string | null,
  method?: string | null,
};

export type DeletePracticeCheckInInput = {
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

export type ModelPracticeFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  location?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  status?: ModelStringInput | null,
  qrToken?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPracticeFilterInput | null > | null,
  or?: Array< ModelPracticeFilterInput | null > | null,
  not?: ModelPracticeFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelPracticeConnection = {
  __typename: "ModelPracticeConnection",
  items:  Array<Practice | null >,
  nextToken?: string | null,
};

export type ModelAdminLogFilterInput = {
  id?: ModelIDInput | null,
  adminSub?: ModelStringInput | null,
  adminName?: ModelStringInput | null,
  action?: ModelStringInput | null,
  resourceType?: ModelStringInput | null,
  resourceTitle?: ModelStringInput | null,
  timestamp?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAdminLogFilterInput | null > | null,
  or?: Array< ModelAdminLogFilterInput | null > | null,
  not?: ModelAdminLogFilterInput | null,
};

export type ModelAdminLogConnection = {
  __typename: "ModelAdminLogConnection",
  items:  Array<AdminLog | null >,
  nextToken?: string | null,
};

export type ModelPracticeCheckInFilterInput = {
  id?: ModelIDInput | null,
  practiceId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  scannerSub?: ModelStringInput | null,
  scannerName?: ModelStringInput | null,
  method?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPracticeCheckInFilterInput | null > | null,
  or?: Array< ModelPracticeCheckInFilterInput | null > | null,
  not?: ModelPracticeCheckInFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelPracticeCheckInConnection = {
  __typename: "ModelPracticeCheckInConnection",
  items:  Array<PracticeCheckIn | null >,
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


export type ModelResolutionFilterInput = {
  id?: ModelIDInput | null,
  pk?: ModelStringInput | null,
  date?: ModelStringInput | null,
  title?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelResolutionFilterInput | null > | null,
  or?: Array< ModelResolutionFilterInput | null > | null,
  not?: ModelResolutionFilterInput | null,
};

export type ModelResolutionConnection = {
  __typename: "ModelResolutionConnection",
  items:  Array<Resolution | null >,
  nextToken?: string | null,
};

export type ModelBoletinFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBoletinFilterInput | null > | null,
  or?: Array< ModelBoletinFilterInput | null > | null,
  not?: ModelBoletinFilterInput | null,
};

export type ModelBoletinConnection = {
  __typename: "ModelBoletinConnection",
  items:  Array<Boletin | null >,
  nextToken?: string | null,
};

export type ModelSiteConfigFilterInput = {
  id?: ModelIDInput | null,
  value?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSiteConfigFilterInput | null > | null,
  or?: Array< ModelSiteConfigFilterInput | null > | null,
  not?: ModelSiteConfigFilterInput | null,
};

export type ModelSiteConfigConnection = {
  __typename: "ModelSiteConfigConnection",
  items:  Array<SiteConfig | null >,
  nextToken?: string | null,
};

export type ModelNoticiaFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  s3Key?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelNoticiaFilterInput | null > | null,
  or?: Array< ModelNoticiaFilterInput | null > | null,
  not?: ModelNoticiaFilterInput | null,
};

export type ModelNoticiaConnection = {
  __typename: "ModelNoticiaConnection",
  items:  Array<Noticia | null >,
  nextToken?: string | null,
};

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

export type ModelSubscriptionPracticeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  qrToken?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPracticeFilterInput | null > | null,
  or?: Array< ModelSubscriptionPracticeFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionAdminLogFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  adminSub?: ModelSubscriptionStringInput | null,
  adminName?: ModelSubscriptionStringInput | null,
  action?: ModelSubscriptionStringInput | null,
  resourceType?: ModelSubscriptionStringInput | null,
  resourceTitle?: ModelSubscriptionStringInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdminLogFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdminLogFilterInput | null > | null,
};

export type ModelSubscriptionPracticeCheckInFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  practiceId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  scannerSub?: ModelSubscriptionStringInput | null,
  scannerName?: ModelSubscriptionStringInput | null,
  method?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPracticeCheckInFilterInput | null > | null,
  or?: Array< ModelSubscriptionPracticeCheckInFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionResolutionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  pk?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionResolutionFilterInput | null > | null,
  or?: Array< ModelSubscriptionResolutionFilterInput | null > | null,
};

export type ModelSubscriptionBoletinFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBoletinFilterInput | null > | null,
  or?: Array< ModelSubscriptionBoletinFilterInput | null > | null,
};

export type ModelSubscriptionSiteConfigFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  value?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSiteConfigFilterInput | null > | null,
  or?: Array< ModelSubscriptionSiteConfigFilterInput | null > | null,
};

export type ModelSubscriptionNoticiaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  s3Key?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNoticiaFilterInput | null > | null,
  or?: Array< ModelSubscriptionNoticiaFilterInput | null > | null,
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

export type CreateResolutionMutationVariables = {
  input: CreateResolutionInput,
  condition?: ModelResolutionConditionInput | null,
};

export type CreateResolutionMutation = {
  createResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateResolutionMutationVariables = {
  input: UpdateResolutionInput,
  condition?: ModelResolutionConditionInput | null,
};

export type UpdateResolutionMutation = {
  updateResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteResolutionMutationVariables = {
  input: DeleteResolutionInput,
  condition?: ModelResolutionConditionInput | null,
};

export type DeleteResolutionMutation = {
  deleteResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePracticeMutationVariables = {
  input: CreatePracticeInput,
  condition?: ModelPracticeConditionInput | null,
};

export type CreatePracticeMutation = {
  createPractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePracticeMutationVariables = {
  input: UpdatePracticeInput,
  condition?: ModelPracticeConditionInput | null,
};

export type UpdatePracticeMutation = {
  updatePractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePracticeMutationVariables = {
  input: DeletePracticeInput,
  condition?: ModelPracticeConditionInput | null,
};

export type DeletePracticeMutation = {
  deletePractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateBoletinMutationVariables = {
  input: CreateBoletinInput,
  condition?: ModelBoletinConditionInput | null,
};

export type CreateBoletinMutation = {
  createBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBoletinMutationVariables = {
  input: UpdateBoletinInput,
  condition?: ModelBoletinConditionInput | null,
};

export type UpdateBoletinMutation = {
  updateBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBoletinMutationVariables = {
  input: DeleteBoletinInput,
  condition?: ModelBoletinConditionInput | null,
};

export type DeleteBoletinMutation = {
  deleteBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSiteConfigMutationVariables = {
  input: CreateSiteConfigInput,
  condition?: ModelSiteConfigConditionInput | null,
};

export type CreateSiteConfigMutation = {
  createSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSiteConfigMutationVariables = {
  input: UpdateSiteConfigInput,
  condition?: ModelSiteConfigConditionInput | null,
};

export type UpdateSiteConfigMutation = {
  updateSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSiteConfigMutationVariables = {
  input: DeleteSiteConfigInput,
  condition?: ModelSiteConfigConditionInput | null,
};

export type DeleteSiteConfigMutation = {
  deleteSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNoticiaMutationVariables = {
  input: CreateNoticiaInput,
  condition?: ModelNoticiaConditionInput | null,
};

export type CreateNoticiaMutation = {
  createNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNoticiaMutationVariables = {
  input: UpdateNoticiaInput,
  condition?: ModelNoticiaConditionInput | null,
};

export type UpdateNoticiaMutation = {
  updateNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNoticiaMutationVariables = {
  input: DeleteNoticiaInput,
  condition?: ModelNoticiaConditionInput | null,
};

export type DeleteNoticiaMutation = {
  deleteNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAdminLogMutationVariables = {
  input: CreateAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type CreateAdminLogMutation = {
  createAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdminLogMutationVariables = {
  input: UpdateAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type UpdateAdminLogMutation = {
  updateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdminLogMutationVariables = {
  input: DeleteAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type DeleteAdminLogMutation = {
  deleteAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePracticeCheckInMutationVariables = {
  input: CreatePracticeCheckInInput,
  condition?: ModelPracticeCheckInConditionInput | null,
};

export type CreatePracticeCheckInMutation = {
  createPracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePracticeCheckInMutationVariables = {
  input: UpdatePracticeCheckInInput,
  condition?: ModelPracticeCheckInConditionInput | null,
};

export type UpdatePracticeCheckInMutation = {
  updatePracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePracticeCheckInMutationVariables = {
  input: DeletePracticeCheckInInput,
  condition?: ModelPracticeCheckInConditionInput | null,
};

export type DeletePracticeCheckInMutation = {
  deletePracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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

export type GetPracticeQueryVariables = {
  id: string,
};

export type GetPracticeQuery = {
  getPractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPracticesQueryVariables = {
  filter?: ModelPracticeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPracticesQuery = {
  listPractices?:  {
    __typename: "ModelPracticeConnection",
    items:  Array< {
      __typename: "Practice",
      id: string,
      title: string,
      date: string,
      startTime?: string | null,
      location?: string | null,
      notes?: string | null,
      status?: string | null,
      qrToken: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAdminLogQueryVariables = {
  id: string,
};

export type GetAdminLogQuery = {
  getAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdminLogsQueryVariables = {
  filter?: ModelAdminLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdminLogsQuery = {
  listAdminLogs?:  {
    __typename: "ModelAdminLogConnection",
    items:  Array< {
      __typename: "AdminLog",
      id: string,
      adminSub: string,
      adminName: string,
      action: string,
      resourceType: string,
      resourceTitle?: string | null,
      timestamp: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPracticeCheckInQueryVariables = {
  id: string,
};

export type GetPracticeCheckInQuery = {
  getPracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPracticeCheckInsQueryVariables = {
  filter?: ModelPracticeCheckInFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPracticeCheckInsQuery = {
  listPracticeCheckIns?:  {
    __typename: "ModelPracticeCheckInConnection",
    items:  Array< {
      __typename: "PracticeCheckIn",
      id: string,
      practiceId: string,
      userId: string,
      timestamp: string,
      scannerSub?: string | null,
      scannerName?: string | null,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
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

export type PracticeByQrTokenQueryVariables = {
  qrToken: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPracticeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PracticeByQrTokenQuery = {
  practiceByQrToken?:  {
    __typename: "ModelPracticeConnection",
    items:  Array< {
      __typename: "Practice",
      id: string,
      title: string,
      date: string,
      startTime?: string | null,
      location?: string | null,
      notes?: string | null,
      status?: string | null,
      qrToken: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PracticeCheckInsByPracticeIdAndTimestampQueryVariables = {
  practiceId: string,
  timestamp?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPracticeCheckInFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PracticeCheckInsByPracticeIdAndTimestampQuery = {
  practiceCheckInsByPracticeIdAndTimestamp?:  {
    __typename: "ModelPracticeCheckInConnection",
    items:  Array< {
      __typename: "PracticeCheckIn",
      id: string,
      practiceId: string,
      userId: string,
      timestamp: string,
      scannerSub?: string | null,
      scannerName?: string | null,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PracticeCheckInsByUserIdAndTimestampQueryVariables = {
  userId: string,
  timestamp?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPracticeCheckInFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PracticeCheckInsByUserIdAndTimestampQuery = {
  practiceCheckInsByUserIdAndTimestamp?:  {
    __typename: "ModelPracticeCheckInConnection",
    items:  Array< {
      __typename: "PracticeCheckIn",
      id: string,
      practiceId: string,
      userId: string,
      timestamp: string,
      scannerSub?: string | null,
      scannerName?: string | null,
      method?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetResolutionQueryVariables = {
  id: string,
};

export type GetResolutionQuery = {
  getResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListResolutionsQueryVariables = {
  filter?: ModelResolutionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResolutionsQuery = {
  listResolutions?:  {
    __typename: "ModelResolutionConnection",
    items:  Array< {
      __typename: "Resolution",
      id: string,
      pk: string,
      date: string,
      title: string,
      s3Key: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ResolutionsByPkAndDateQueryVariables = {
  pk: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelResolutionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ResolutionsByPkAndDateQuery = {
  resolutionsByPkAndDate?:  {
    __typename: "ModelResolutionConnection",
    items:  Array< {
      __typename: "Resolution",
      id: string,
      pk: string,
      date: string,
      title: string,
      s3Key: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBoletinQueryVariables = {
  id: string,
};

export type GetBoletinQuery = {
  getBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBoletinsQueryVariables = {
  filter?: ModelBoletinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBoletinsQuery = {
  listBoletins?:  {
    __typename: "ModelBoletinConnection",
    items:  Array< {
      __typename: "Boletin",
      id: string,
      title: string,
      date: string,
      s3Key: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSiteConfigQueryVariables = {
  id: string,
};

export type GetSiteConfigQuery = {
  getSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSiteConfigsQueryVariables = {
  filter?: ModelSiteConfigFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSiteConfigsQuery = {
  listSiteConfigs?:  {
    __typename: "ModelSiteConfigConnection",
    items:  Array< {
      __typename: "SiteConfig",
      id: string,
      value: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNoticiaQueryVariables = {
  id: string,
};

export type GetNoticiaQuery = {
  getNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNoticiasQueryVariables = {
  filter?: ModelNoticiaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNoticiasQuery = {
  listNoticias?:  {
    __typename: "ModelNoticiaConnection",
    items:  Array< {
      __typename: "Noticia",
      id: string,
      title: string,
      date: string,
      s3Key: string,
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

export type OnCreatePracticeSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeFilterInput | null,
  owner?: string | null,
};

export type OnCreatePracticeSubscription = {
  onCreatePractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePracticeSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePracticeSubscription = {
  onUpdatePractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePracticeSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeFilterInput | null,
  owner?: string | null,
};

export type OnDeletePracticeSubscription = {
  onDeletePractice?:  {
    __typename: "Practice",
    id: string,
    title: string,
    date: string,
    startTime?: string | null,
    location?: string | null,
    notes?: string | null,
    status?: string | null,
    qrToken: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnCreateAdminLogSubscription = {
  onCreateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnUpdateAdminLogSubscription = {
  onUpdateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnDeleteAdminLogSubscription = {
  onDeleteAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    adminSub: string,
    adminName: string,
    action: string,
    resourceType: string,
    resourceTitle?: string | null,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePracticeCheckInSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeCheckInFilterInput | null,
  owner?: string | null,
};

export type OnCreatePracticeCheckInSubscription = {
  onCreatePracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePracticeCheckInSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeCheckInFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePracticeCheckInSubscription = {
  onUpdatePracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePracticeCheckInSubscriptionVariables = {
  filter?: ModelSubscriptionPracticeCheckInFilterInput | null,
  owner?: string | null,
};

export type OnDeletePracticeCheckInSubscription = {
  onDeletePracticeCheckIn?:  {
    __typename: "PracticeCheckIn",
    id: string,
    practiceId: string,
    userId: string,
    timestamp: string,
    scannerSub?: string | null,
    scannerName?: string | null,
    method?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateResolutionSubscriptionVariables = {
  filter?: ModelSubscriptionResolutionFilterInput | null,
};

export type OnCreateResolutionSubscription = {
  onCreateResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateResolutionSubscriptionVariables = {
  filter?: ModelSubscriptionResolutionFilterInput | null,
};

export type OnUpdateResolutionSubscription = {
  onUpdateResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteResolutionSubscriptionVariables = {
  filter?: ModelSubscriptionResolutionFilterInput | null,
};

export type OnDeleteResolutionSubscription = {
  onDeleteResolution?:  {
    __typename: "Resolution",
    id: string,
    pk: string,
    date: string,
    title: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBoletinSubscriptionVariables = {
  filter?: ModelSubscriptionBoletinFilterInput | null,
};

export type OnCreateBoletinSubscription = {
  onCreateBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBoletinSubscriptionVariables = {
  filter?: ModelSubscriptionBoletinFilterInput | null,
};

export type OnUpdateBoletinSubscription = {
  onUpdateBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBoletinSubscriptionVariables = {
  filter?: ModelSubscriptionBoletinFilterInput | null,
};

export type OnDeleteBoletinSubscription = {
  onDeleteBoletin?:  {
    __typename: "Boletin",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSiteConfigSubscriptionVariables = {
  filter?: ModelSubscriptionSiteConfigFilterInput | null,
};

export type OnCreateSiteConfigSubscription = {
  onCreateSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSiteConfigSubscriptionVariables = {
  filter?: ModelSubscriptionSiteConfigFilterInput | null,
};

export type OnUpdateSiteConfigSubscription = {
  onUpdateSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSiteConfigSubscriptionVariables = {
  filter?: ModelSubscriptionSiteConfigFilterInput | null,
};

export type OnDeleteSiteConfigSubscription = {
  onDeleteSiteConfig?:  {
    __typename: "SiteConfig",
    id: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNoticiaSubscriptionVariables = {
  filter?: ModelSubscriptionNoticiaFilterInput | null,
};

export type OnCreateNoticiaSubscription = {
  onCreateNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNoticiaSubscriptionVariables = {
  filter?: ModelSubscriptionNoticiaFilterInput | null,
};

export type OnUpdateNoticiaSubscription = {
  onUpdateNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNoticiaSubscriptionVariables = {
  filter?: ModelSubscriptionNoticiaFilterInput | null,
};

export type OnDeleteNoticiaSubscription = {
  onDeleteNoticia?:  {
    __typename: "Noticia",
    id: string,
    title: string,
    date: string,
    s3Key: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
