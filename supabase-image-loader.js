// supabase-image-loader.js
const DEFAULT_SUPABASE_URL = 'https://umkmwbkwvulxtdodzmzf.supabase.co';

export default function supabaseLoader({ src, width, quality }) {
  if (src.startsWith('/')) return src;

  const appendParams = (url, w, q) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}width=${w}&quality=${q || 75}`;
  };

  if (src.endsWith('.svg')) {
    return appendParams(src, width, quality || 75);
  }

  if (src.includes('/storage/v1/object/public/')) {
    const base = src.startsWith('http')
      ? src
      : `${DEFAULT_SUPABASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
    const newSrc = base.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
    return appendParams(newSrc, width, quality || 75);
  }

  return src;
}
