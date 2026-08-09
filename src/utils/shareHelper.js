/**
 * Utility for uploading generated canvas graphics to cloud storage
 * to enable live OG image previews when sharing links on X (Twitter), LinkedIn, etc.
 */

export async function uploadGraphicToCloud(canvasDataUrl) {
  if (!canvasDataUrl) return null;

  try {
    const res = await fetch(canvasDataUrl);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append('file', blob, `hhgoa_graphic_${Date.now()}.png`);

    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.status === 'success' && data.data && data.data.url) {
      // Convert standard tmpfiles URL to direct viewable download/image URL for OG preview
      const rawUrl = data.data.url;
      const directImageUrl = rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      return directImageUrl;
    }
  } catch (err) {
    console.warn('Cloud image upload failed (will use fallback):', err);
  }

  return null;
}
