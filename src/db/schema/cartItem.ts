import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { listing } from "./listing";
import { user } from "./user";

export const cartItem = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  listingId: integer("listing_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItemRelation = relations(cartItem, ({ one }) => ({
  listing: one(listing, {
    fields: [cartItem.listingId],
    references: [listing.id],
  }),
  author: one(user, {
    fields: [cartItem.authorId],
    references: [user.id],
  }),
}));
