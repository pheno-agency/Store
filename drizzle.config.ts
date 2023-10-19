import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: "./.env.local" });

const url = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require&options=project%3D${process.env.ENDPOINT_ID}`;

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    connectionString: url,
  },
  driver: "pg",
} satisfies Config;
