// Prefixes a root-relative path with the configured base URL so assets resolve
// correctly when the site is served from a subpath (e.g. GitHub Pages).
// Pass paths like '/images/foo.jpg'; the leading slash is preserved.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
  const pathClean = path.startsWith('/') ? path : `/${path}`;
  return `${baseClean}${pathClean}`;
}
