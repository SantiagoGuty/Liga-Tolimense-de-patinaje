// src/services/qrService.ts
import QRCode from 'qrcode';

/** Build a PNG Blob for a given QR payload. */
export async function makeQrPngBlob(
  payload: string,
  size = 640,                    // crisp on retina
): Promise<Blob> {
  const dataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    width: size,
    margin: 1,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
  // Convert data URL → Blob
  const res = await fetch(dataUrl);
  return await res.blob();
}
