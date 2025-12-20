// src/services/userProfile.ts
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

/**
 * Inline GraphQL operations.
 * (If you use codegen, you can swap these for imports from ../graphql/*)
 */
const GetUser = /* GraphQL */ `
  query GetUser($id: ID!) {
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
      avatarKey
      qrKey
      qrPayload
    }
  }
`;

const CreateUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
      avatarKey
      qrKey
      qrPayload
    }
  }
`;

const UpdateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
      avatarKey
      qrKey
      qrPayload
    }
  }
`;

/** Fields you can set when creating the profile */
export type CreateUserInput = {
  nombre: string;
  apellido: string;
  correo?: string;
  telefono?: string;
  fechaNacimiento?: string;
  sexo?: string;
  cedula?: string;
  permiso?: string;
  estatus?: string;
  avatarKey?: string;   // allow avatar to be set at creation
  qrKey?: string;       // optional: if your schema allows setting on create
  qrPayload?: string;   // optional
};

/** Update payload (all optional) */
export type UpdateUserFields = Partial<CreateUserInput> & {
  // id is resolved from the current user, so not required here
};

/** Utility: remove undefined keys so we don't send them to GraphQL */
function pruneUndefined<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out as T;
}

/** Get the signed-in user's profile by Cognito sub (id). */
export async function getCurrentUserProfile() {
  const { userId } = await getCurrentUser(); // Cognito sub
  const res = await client.graphql({
    query: GetUser,
    variables: { id: userId },
    authMode: 'userPool', // ensure User Pools auth
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.getUser ?? null;
}

/** Create the signed-in user's profile (id = Cognito sub). */
export async function createCurrentUserProfile(input: CreateUserInput) {
  const { userId, signInDetails } = await getCurrentUser();
  const email = input.correo ?? signInDetails?.loginId ?? '';

  const payload = pruneUndefined({
    id: userId,                 // enforce one profile per user
    nombre: input.nombre,
    apellido: input.apellido,
    correo: email,
    telefono: input.telefono,
    fechaNacimiento: input.fechaNacimiento,
    sexo: input.sexo,
    cedula: input.cedula,
    permiso: input.permiso,
    estatus: input.estatus,
    avatarKey: input.avatarKey,
    qrKey: input.qrKey,
    qrPayload: input.qrPayload,
  });

  const res = await client.graphql({
    query: CreateUser,
    variables: { input: payload },
    authMode: 'userPool',
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.createUser ?? null;
}

/** Update only the avatarKey for the current user. */
export async function updateCurrentUserAvatar(avatarKey: string) {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: { id: userId, avatarKey } },
    authMode: 'userPool',
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}

/** Update arbitrary fields on the current user's profile. */
export async function updateCurrentUserProfile(fields: UpdateUserFields) {
  const { userId } = await getCurrentUser();
  const payload = pruneUndefined({ id: userId, ...fields });
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: payload },
    authMode: 'userPool',
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}

/** Save QR fields for the current user. */
export async function saveCurrentUserQr(qrKey: string, qrPayload: string) {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: { id: userId, qrKey, qrPayload } },
    authMode: 'userPool',
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}

/**
 * Upsert helper:
 * - If the profile exists, update it with the provided fields
 * - If not, create it
 */
export async function upsertCurrentUserProfile(input: CreateUserInput) {
  const existing = await getCurrentUserProfile().catch(() => null);
  if (existing?.id) {
    return updateCurrentUserProfile(input);
  }
  return createCurrentUserProfile(input);
}


const DeleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
    }
  }
`;

// ⬇️ exporta esta función junto a las demás
export async function deleteCurrentUserProfile() {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: DeleteUser,
    variables: { input: { id: userId } },
    authMode: 'userPool',
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.deleteUser ?? null;
}
