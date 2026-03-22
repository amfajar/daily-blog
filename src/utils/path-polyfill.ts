export const basename = (p: string | undefined): string => p ? p.split(/[\\/]/).pop() || "" : "";
export const extname = (p: string | undefined): string => { const b = basename(p); if (!b) return ""; const i = b.lastIndexOf("."); return i === -1 ? "" : b.substring(i); };
export const join = (...args: string[]) => args.filter(Boolean).join("/").replace(/\/+/g, "/");
export const normalize = (p: string) => p ? p.replace(/\\/g, "/") : "";
export const dirname = (p: string) => p ? p.split(/[\\/]/).slice(0, -1).join("/") || "." : ".";
const relative = (from: string, to: string) => to.replace(from, "");
const resolve = (...args: string[]) => join(...args);

export default { basename, extname, join, normalize, dirname, relative, resolve };
