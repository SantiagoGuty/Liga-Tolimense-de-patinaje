import { uploadData, getUrl } from 'aws-amplify/storage';

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
