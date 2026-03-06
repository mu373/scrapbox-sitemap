const SCRAPBOX_HOST = "scrapbox.io";

const cookie = (sid: string) => `connect.sid=${sid}`;

/** Export all pages from a project via GET /api/page-data/export/{project}.json */
export const exportPages = async (
  project: string,
  init: { sid: string; metadata: boolean },
): Promise<
  // deno-lint-ignore no-explicit-any
  { ok: true; value: any } | { ok: false; value: Error }
> => {
  const res = await fetch(
    `https://${SCRAPBOX_HOST}/api/page-data/export/${project}.json?metadata=${init.metadata}`,
    { headers: { Cookie: cookie(init.sid) } },
  );

  if (!res.ok) {
    const text = await res.text();
    return {
      ok: false,
      value: new Error(`Export failed: ${res.status} ${text}`),
    };
  }

  return { ok: true, value: await res.json() };
};
