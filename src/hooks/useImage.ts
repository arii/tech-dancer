import { useState } from 'react';

export function useImage() {
  const [imgError, setImgError] = useState(false);
  const handleImgError = () => setImgError(true);
  return { imgError, handleImgError };
}
