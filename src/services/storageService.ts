import { uploadData, getUrl } from 'aws-amplify/storage';

const S3_BUCKET = 'ligapatinajetolima8e11dd5918ec4ca9b828ffdcb2c0ed19c4-dev';
const S3_REGION = 'us-east-1';

/**
 * Returns a direct, public, never-expiring S3 URL for a guest-level file.
 * Requires the bucket to have a public-read policy on the public/* prefix.
 * No AWS credentials needed — works for every visitor.
 */
export function buildPublicUrl(key: string): string {
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/public/${key}`;
}

export async function uploadPublicPdf(file: File, folder: string): Promise<string> {
  const key = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.pdf`;
  await uploadData({
    key,
    data: file,
    options: { accessLevel: 'guest', contentType: 'application/pdf' },
  }).result;
  return key;
}

export async function getPublicUrl(key: string): Promise<string> {
  const { url } = await getUrl({
    key,
    options: { accessLevel: 'guest', expiresIn: 3600 },
  });
  return url.toString();
}

export async function uploadAvatar(file: File, key?: string) {
  const ext = file.name.split('.').pop() || 'png';
  const finalKey = key ?? `avatars/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  await uploadData({
    key: finalKey,
    data: file,
    options: { accessLevel: 'protected', contentType: file.type },
  }).result;

  return finalKey;
}

export async function getAvatarUrl(key: string) {
  const { url } = await getUrl({
    key,
    options: { accessLevel: 'protected', expiresIn: 3600 },
  });
  return url;
}

export async function uploadProtected(
  key: string,
  data: Blob | ArrayBuffer | Uint8Array,
  contentType = 'image/png'
) {
  await uploadData({
    key,
    data,
    options: { accessLevel: 'protected', contentType },
  }).result;
  return key;
}

export async function getProtectedUrl(key: string, expiresIn = 3600) {
  const { url } = await getUrl({
    key,
    options: { accessLevel: 'protected', expiresIn },
  });
  return url;
}
