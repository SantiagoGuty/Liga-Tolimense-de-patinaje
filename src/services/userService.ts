// src/services/userService.ts (pattern)
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

export async function myQuery(vars: any) {
  const res = await client.graphql({ query: /* GraphQL */`...`, variables: vars });
  const data = 'data' in res ? (res as any).data : null;   // <-- avoids the union type issue
  return data;
}
