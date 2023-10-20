import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { RequestEventBase } from "@builder.io/qwik-city";
import * as productSchema from "./product";
import * as userSchema from "./user";
import * as listingSchema from "./listing";
import * as cartItemSchema from "./cartItem";

export function getDbUrl(req: RequestEventBase) {
  const [PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID] = [
    req.env.get("PGHOST"),
    req.env.get("PGDATABASE"),
    req.env.get("PGUSER"),
    req.env.get("PGPASSWORD"),
    req.env.get("ENDPOINT_ID"),
  ];

  const url = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&options=project%3D${ENDPOINT_ID}`;
  return url;
}

const schemas = {
  ...productSchema,
  ...userSchema,
  ...listingSchema,
  ...cartItemSchema,
};

let cached: Promise<{
  db: NeonHttpDatabase<typeof schemas>;
  client: NeonQueryFunction<false, false>;
}> | null = null;

neonConfig.fetchConnectionCache = true;

export async function createClient(req: RequestEventBase) {
  if (cached) {
    return cached;
  }
  // eslint-disable-next-line no-async-promise-executor
  cached = new Promise(async (res) => {
    const sql = neon(getDbUrl(req));
    const db = drizzle(sql, { schema: schemas });

    res({ db, client: sql });
  });
  return cached;
}
