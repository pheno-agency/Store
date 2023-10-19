import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require&options=project%3D${process.env.ENDPOINT_ID}`;

async function execute() {
  const sql = postgres(url, { ssl: "require" });
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration successfully executed");
    process.exit(0);
  } catch (error) {
    console.error("Error occurred during the migration process: ", error);
    process.exit(1);
  }
}

execute();
