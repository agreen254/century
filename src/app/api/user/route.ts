import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await pool.connect();
  const res = await client.query(
    `INSERT INTO users ( username ) VALUES ( $1::text ) RETURNING *`,
    [body?.username]
  );

  client.release();
  return NextResponse.json(res);
}
