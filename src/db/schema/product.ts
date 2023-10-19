import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { listing } from "./listing";

export const product = pgTable(
  "product",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    price: integer("price").notNull(),
    description: text("description"),
    author: integer("author"),
    cover: text("cover"),
    listingId: integer("listing-id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      titleIdx: index("title_idx").on(table.title),
    };
  },
);

export const productRelation = relations(product, ({ one }) => ({
  listing: one(listing, {
    fields: [product.listingId],
    references: [listing.id],
  }),
}));
