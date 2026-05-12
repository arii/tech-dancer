import { useState, useCallback } from 'react';
import { VIEWPORTS } from './useUXAuditor';

export function useSnapshotManager() {
  const [snapshotService, setSnapshotService] = useState(localStorage.getItem('ux-auditor-snapshot-service') || "");

  const updateSnapshotService = (service: string) => {
    setSnapshotService(service);
    localStorage.setItem('ux-auditor-snapshot-service', service);
  };

  const getSnapshotUrl = useCallback((targetUrl: string, viewport: typeof VIEWPORTS[0]) => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (snapshotService) {
      return snapshotService
        .replaceAll('{url}', encodeURIComponent(targetUrl))
        .replaceAll('{width}', viewport.width.toString())
        .replaceAll('{height}', viewport.height.toString())
        .replaceAll('{viewport}', viewport.name.toLowerCase());
    }

    if (isLocalhost) {
      return `/ux-audits/audit-${viewport.name.toLowerCase()}.png`;
    }

    const scaledW = Math.floor(viewport.width * 0.5);
    const scaledH = Math.floor(viewport.height * 0.5);
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=${scaledW}&h=${scaledH}`;
  }, [snapshotService]);

  const fetchSnapshot = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch snapshot');
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  return {
    snapshotService,
    setSnapshotService: updateSnapshotService,
    getSnapshotUrl,
    fetchSnapshot
  };
}
