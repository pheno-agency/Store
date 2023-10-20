import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { listing } from "./listing";

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description"),
  authorId: integer("author_id").notNull(),
  cover: text("cover"),
  listingId: integer("listing_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productRelation = relations(product, ({ one }) => ({
  listing: one(listing, {
    fields: [product.listingId],
    references: [listing.id],
  }),
}));
