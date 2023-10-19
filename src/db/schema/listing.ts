import { relations } from "drizzle-orm";
import { index, pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { user } from "./user";
import { product } from "./product";

export const listing = pgTable(
  "listing",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    authorId: integer("author-id").notNull(),
  },
  (table) => {
    return {
      titleIdx: index("title_idx").on(table.title),
    };
  },
);

export const listingRelation = relations(listing, ({ one, many }) => ({
  author: one(user, {
    fields: [listing.authorId],
    references: [user.id],
  }),
  products: many(product),
}));
