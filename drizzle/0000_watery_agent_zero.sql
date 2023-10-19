CREATE TABLE IF NOT EXISTS "listing" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author-id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"author" integer,
	"cover" text,
	"listing-id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "listing" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "product" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "user" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "user" ("email");