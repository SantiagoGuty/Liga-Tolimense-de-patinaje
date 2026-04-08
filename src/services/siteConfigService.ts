import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const GET_SITE_CONFIG = /* GraphQL */ `
  query GetSiteConfig($id: ID!) {
    getSiteConfig(id: $id) { id value }
  }
`;

const CREATE_SITE_CONFIG = /* GraphQL */ `
  mutation CreateSiteConfig($input: CreateSiteConfigInput!) {
    createSiteConfig(input: $input) { id value }
  }
`;

const UPDATE_SITE_CONFIG = /* GraphQL */ `
  mutation UpdateSiteConfig($input: UpdateSiteConfigInput!) {
    updateSiteConfig(input: $input) { id value }
  }
`;

const FEATURED_KEY = 'FEATURED_NOTICIAS';

/** Returns an array of up to 3 featured noticia IDs, or null if not set.
 *  Uses API key so unauthenticated visitors on the home page can read it. */
export async function getFeaturedNoticiaIds(): Promise<string[] | null> {
  try {
    const { data } = (await client.graphql({
      query: GET_SITE_CONFIG,
      variables: { id: FEATURED_KEY },
      authMode: 'apiKey',
    })) as any;
    const val = data?.getSiteConfig?.value;
    if (!val) return null;
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Saves the selected featured noticia IDs (max 3). Admin only. */
export async function setFeaturedNoticiaIds(ids: string[]): Promise<void> {
  const value = JSON.stringify(ids.slice(0, 3));

  // Check if record already exists (use userPool — admin is signed in)
  let exists = false;
  try {
    const { data } = (await client.graphql({
      query: GET_SITE_CONFIG,
      variables: { id: FEATURED_KEY },
    })) as any;
    exists = !!data?.getSiteConfig;
  } catch { /* assume it doesn't exist */ }

  if (exists) {
    await client.graphql({
      query: UPDATE_SITE_CONFIG,
      variables: { input: { id: FEATURED_KEY, value } },
    });
  } else {
    await client.graphql({
      query: CREATE_SITE_CONFIG,
      variables: { input: { id: FEATURED_KEY, value } },
    });
  }
}
