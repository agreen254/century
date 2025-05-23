import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const client = await pool.connect();
  const path = req.nextUrl.pathname.split("/");
  const username = path[path.length - 1];

  const res = await client.query(
    `SELECT id, created_at, updated_at, grade, color, zone, notes FROM climbs WHERE user_id = $1::text`,
    [username]
  );

  client.release();
  return NextResponse.json(res.rowCount === 0 ? [] : res.rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const client = await pool.connect();
  const path = req.nextUrl.pathname.split("/");
  const username = path[path.length - 1];

  const res = await client.query(
    `INSERT INTO climbs (grade, color, zone, notes, user_id) VALUES ($1::int2, $2::text, $3::text, $4::text, $5::text) RETURNING *`,
    [body?.grade, body?.color, body?.zone, body?.notes, username]
  );

  client.release();
  return NextResponse.json(res);
}
