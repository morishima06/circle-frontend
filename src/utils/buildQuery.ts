// utils/buildQuery.ts
export function buildQuery(
  params: Record<string, string | string[] | undefined>,
) {
  const query: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value) && value.length > 0) {
      query[key] = value.join(",");
    } else if (typeof value === "string" && value) {
      query[key] = value;
    }
  }

  return query;
}
