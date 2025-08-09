import { NextRequest, NextResponse } from "next/server";
import { fetchNasdaqDataset } from "@/lib/nasdaq";

export const dynamic = "force-dynamic";

// Minimal proxy: /api/nasdaq?db=...&ds=...&start_date=...&end_date=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const databaseCode = searchParams.get("db");
  const datasetCode = searchParams.get("ds");

  if (!databaseCode || !datasetCode) {
    return NextResponse.json(
      { error: "Missing required parameters db and ds" },
      { status: 400 }
    );
  }

  const params: Record<string, string> = {};
  for (const [k, v] of searchParams.entries()) {
    if (k !== "db" && k !== "ds") params[k] = v;
  }

  try {
    const data = await fetchNasdaqDataset(databaseCode, datasetCode, params);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 502 });
  }
}
