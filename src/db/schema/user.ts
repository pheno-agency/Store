import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { listing } from "./listing";
import { cartItem } from "./cartItem";

export const user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: varchar("password", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const userRelation = relations(user, ({ many }) => ({
  listings: many(listing),
  cartItems: many(cartItem),
}));
