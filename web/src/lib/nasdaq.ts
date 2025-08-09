export type NasdaqDatasetParams = Record<string, string | number | boolean | undefined>;

function getApiKey(): string | undefined {
  return process.env.NASDAQ_API_KEY || process.env.NEXT_PUBLIC_NASDAQ_API_KEY;
}

export async function fetchNasdaqDataset(
  databaseCode: string,
  datasetCode: string,
  params: NasdaqDatasetParams = {}
) {
  const apiKey = getApiKey();
  const url = new URL(
    `https://data.nasdaq.com/api/v3/datasets/${encodeURIComponent(databaseCode)}/${encodeURIComponent(datasetCode)}.json`
  );

  const search = new URLSearchParams();
  if (apiKey) search.set(api_key, apiKey);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  url.search = search.toString();

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NASDAQ Data Link error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchNasdaqDatatable(
  tableCode: string,
  params: NasdaqDatasetParams = {}
) {
  const apiKey = getApiKey();
  const url = new URL(
    `https://data.nasdaq.com/api/v3/datatables/${encodeURIComponent(tableCode)}.json`
  );

  const search = new URLSearchParams();
  if (apiKey) search.set(api_key, apiKey);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  url.search = search.toString();

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`NASDAQ Datatable error ${res.status}: ${text}`);
  }
  return res.json();
}
