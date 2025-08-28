// src/services/userProfile.ts
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient();

/** Inline GraphQL ops (keeps this file self-contained).
 *  If you prefer codegen, you can import from ../graphql/*. */
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
};

/** Get the signed-in user's profile by Cognito sub (id). */
export async function getCurrentUserProfile() {
  const { userId } = await getCurrentUser(); // Cognito sub
  const res = await client.graphql({ query: GetUser, variables: { id: userId } });
  const data = 'data' in res ? (res as any).data : res;
  return data?.getUser ?? null;
}

/** Create the signed-in user's profile (id = Cognito sub). */
export async function createCurrentUserProfile(input: CreateUserInput) {
  const { userId, signInDetails } = await getCurrentUser();
  const email = input.correo ?? signInDetails?.loginId ?? '';

  const payload = {
    id: userId, // enforce one profile per user
    nombre: input.nombre,
    apellido: input.apellido,
    correo: email,
    telefono: input.telefono ?? null,
    fechaNacimiento: input.fechaNacimiento ?? null,
    sexo: input.sexo ?? null,
    cedula: input.cedula ?? null,
    permiso: input.permiso ?? null,
    estatus: input.estatus ?? null,
  };

  const res = await client.graphql({ query: CreateUser, variables: { input: payload } });
  const data = 'data' in res ? (res as any).data : res;
  return data?.createUser ?? null;
}

/** Update only the avatarKey for the current user. */
export async function updateCurrentUserAvatar(avatarKey: string) {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: { id: userId, avatarKey } },
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}

export async function updateCurrentUserProfile(fields: {
  nombre?: string; apellido?: string; correo?: string; telefono?: string;
  fechaNacimiento?: string; sexo?: string; cedula?: string;
  permiso?: string; estatus?: string; avatarKey?: string;
}) {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: { id: userId, ...fields } },
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}

export async function saveCurrentUserQr(qrKey: string, qrPayload: string) {
  const { userId } = await getCurrentUser();
  const res = await client.graphql({
    query: UpdateUser,
    variables: { input: { id: userId, qrKey, qrPayload } },
  });
  const data = 'data' in res ? (res as any).data : res;
  return data?.updateUser ?? null;
}