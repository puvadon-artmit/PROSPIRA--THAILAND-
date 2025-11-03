export const buildImageURL = (p?: string, baseOverride?: string): string => {
  if (!p) return "";

  if (/^https?:\/\//i.test(p)) return p;

  const filename = p.split("/").pop() || p;

  const base =
    baseOverride ||
    (import.meta.env.VITE_API_BASE as string) 

  if (!base) return p;

  const u = new URL("/api/uploads/get-file", base);
  u.searchParams.set("folder", "company_news");
  u.searchParams.set("filename", filename);
  return u.toString();
};