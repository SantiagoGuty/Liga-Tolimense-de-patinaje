import { generateClient } from 'aws-amplify/api';
import { getIdTokenClaims } from './authService';

const client = generateClient();

const CREATE_LOG = /* GraphQL */ `
  mutation CreateAdminLog($input: CreateAdminLogInput!) {
    createAdminLog(input: $input) { id }
  }
`;

const LIST_LOGS = /* GraphQL */ `
  query ListAdminLogs {
    listAdminLogs(limit: 500) {
      items {
        id adminSub adminName action resourceType resourceTitle timestamp
      }
    }
  }
`;

export type AdminAction = 'CREATE' | 'DELETE' | 'PROMOTE' | 'DEMOTE';
export type ResourceType = 'BOLETIN' | 'RESOLUCION' | 'GUIA' | 'USER';

export async function logAdminAction(params: {
  action: AdminAction;
  resourceType: ResourceType;
  resourceTitle?: string;
}) {
  try {
    const claims = await getIdTokenClaims();
    const adminSub = (claims?.sub as string) ?? 'unknown';
    const adminName = (
      `${claims?.given_name ?? ''} ${claims?.family_name ?? ''}`.trim() ||
      (claims?.email as string) ||
      'Admin'
    );
    await client.graphql({
      query: CREATE_LOG,
      variables: {
        input: {
          adminSub,
          adminName,
          action: params.action,
          resourceType: params.resourceType,
          resourceTitle: params.resourceTitle ?? '',
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch {
    // Log failure is non-fatal — never block the main action
  }
}

export async function fetchAdminLogs() {
  const { data } = (await client.graphql({ query: LIST_LOGS })) as any;
  const items = (data?.listAdminLogs?.items ?? []) as any[];
  return items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}
