import { globalAction$, server$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { listingSchema } from "~/components/forms/Schema";
import { listing } from "~/db/schema/listing";
import { product } from "~/db/schema/product";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";
import {
  updateListingSchema,
  deleteProductAndListingSchema,
} from "~/utils/schema";

export const getListings = server$(async function () {
  const { db } = await createClient(this);

  try {
    const listings = await db.select().from(listing);
    return listings;
  } catch {
    console.log("ERROR");
  }
});

export const getUserListings = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    return [];
  }

  try {
    const userListings = await db.query.listing.findMany({
      where: eq(listing.authorId, session.user.id),
      with: { products: true },
    });
    return userListings;
  } catch {
    console.error("ERROR");
  }
});

export const getListingProducts = server$(async function (id: number) {
  const { db } = await createClient(this);

  try {
    const listingProducts = await db
      .select()
      .from(product)
      .where(eq(product.listingId, id));
    return listingProducts;
  } catch {
    console.error("ERROR");
  }
});

export const useCreateListing = globalAction$(async (data, req) => {
  const { db } = await createClient(req);
  const session = getSession(req);

  if (!session) {
    console.error("ERROR");
  }
  try {
    const list = (
      await db
        .insert(listing)
        .values({
          title: data.title,
          authorId: session!.user.id,
        })
        .returning()
        .execute()
    )[0];
    if (!list) {
      console.error("ERROR");
    }

    return list.id!;
  } catch (error) {
    console.log(error);
  }
}, zod$(listingSchema));

// Update queries
export const useUpdateListing = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("Error occurred");
  }
  await db
    .update(listing)
    .set({ title: data.title })
    .where(
      and(eq(listing.id, data.id), eq(listing.authorId, session!.user.id)),
    );
}, zod$(updateListingSchema));

export const useDeleteListing = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("ERROR");
  }
  await db
    .delete(listing)
    .where(
      and(eq(listing.id, data.id), eq(listing.authorId, session!.user.id)),
    );
}, zod$(deleteProductAndListingSchema));
