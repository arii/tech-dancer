export function filterLowImpactFiles(files: string[], lowImpactPaths: string[]): string[] {
  return files.filter(f => {
    return !lowImpactPaths.some(p => {
      if (f === p || f.endsWith(`/${p}`)) return true;
      if (p.endsWith('/')) {
        return f.startsWith(p) || f.includes(`/${p}`);
      }
      return false;
    });
  });
}
