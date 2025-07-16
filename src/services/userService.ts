// src/services/userService.ts
import usersData from '../mock/users.json'


export interface User {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  fechaNacimiento: string
  sexo: string
  cedula: string
  contrasena: string
  fotoPerfil?: string
  estatus: string
  permiso: string
}

type NewUser = Omit<User, 'id' | 'estatus' | 'permiso'> & { fotoPerfil?: string }

// In-memory users array initialized from your mock JSON
let users: User[] = [...usersData]

// Utility to simulate network latency
const delay = (ms = 500) => new Promise<void>(res => setTimeout(res, ms))

/**
 * Register a new user.
 * Throws if email already exists.
 */
export async function register(newUser: NewUser): Promise<User> {
  await delay()
  if (users.some(u => u.correo === newUser.correo)) {
    throw new Error('Email already in use')
  }
  const id = Date.now().toString()
  const created: User = {
    id,
    ...newUser,
    estatus: 'No valido',
    permiso: 'usuario comun',
  }
  users.push(created)
  return created
}

/**
 * Log in with email & password.
 * Throws on invalid credentials.
 */
export async function login(correo: string, contrasena: string): Promise<User> {
  await delay()
  const user = users.find(u => u.correo === correo && u.contrasena === contrasena)
  if (!user) {
    throw new Error('Invalid credentials')
  }
  // “Persist” the session in localStorage
  localStorage.setItem('currentUser', JSON.stringify(user))
  return user
}

/** Log out by clearing localStorage */
export function logout(): void {
  localStorage.removeItem('currentUser')
}

/** Get currently logged-in user, or null */
export function getCurrentUser(): User | null {
  const json = localStorage.getItem('currentUser')
  return json ? (JSON.parse(json) as User) : null
}


export async function updateUser(updates: Partial<User>): Promise<User> {
  const current = await getCurrentUser()
  if (!current) throw new Error('Not authenticated')
  // merge & persist however you like (Cognito AdminUpdateUserAttributes, Dynamo, etc)
  const merged = { ...current, ...updates }
  // TODO: actually call your API here…
  return merged
}