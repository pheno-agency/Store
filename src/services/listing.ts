import { globalAction$, server$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { listingSchema, productSchema } from "~/components/forms/Schema";
import { cartItem } from "~/db/schema/cartItem";
import { listing } from "~/db/schema/listing";
import { product } from "~/db/schema/product";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";
import {
  updateProductSchema,
  updateListingSchema,
  deleteProductAndListingSchema,
  addToCartSchema,
} from "~/utils/schema";

// TODO: get listingProduct

export const getListings = server$(async function () {
  const { db } = await createClient(this);
  // const session = getSession(this);
  // if (!session) {
  //   // return serverError(this, "error", 403);
  //   return [];
  // }

  try {
    const listings = await db.select().from(listing);
    return listings;
  } catch {
    // return serverError(this, "Getting data faild", 500);
    console.log("ERROR");
  }
});

export const getUserListings = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    // return serverError(this, "error", 403);
    return [];
  }

  try {
    const userListings = await db.query.listing.findMany({
      where: eq(listing.authorId, session.user.id),
      with: { products: true },
    });
    return userListings;
  } catch {
    // return serverError(this, "Getting data faild", 500);
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
    // return serverError(this, "Getting data faild", 500);
    console.error("ERROR");
  }
});

export const useCreateListing = globalAction$(async (data, req) => {
  const { db } = await createClient(req);
  const session = getSession(req);

  if (!session) {
    //   return serverError(req, "Anonymous creation is not implemented yet", 403);
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
      //   return serverError(req, "error", 500);
      console.error("ERROR");
    }
    // const url = list.id
    // list = (
    //   await db
    //     .update(listing)
    //     .set()
    //     .where(eq(listing.id, list.id))
    //     .returning()
    //     .execute()
    // )[0]!;

    return list.id!;
  } catch (error) {
    console.log(error);
  }
}, zod$(listingSchema));

export const useCreateProduct = globalAction$(async (data, req) => {
  const { db } = await createClient(req);
  const session = getSession(req);

  if (!session) {
    //   return serverError(req, "Anonymous creation is not implemented yet", 403);
    console.error("ERROR");
  }
  try {
    const item = (
      await db
        .insert(product)
        .values({
          title: data.title,
          price: data.price,
          description: data.description,
          authorId: session?.user.id!,
          // cover: data.cover,
          listingId: data.listingId, // NOT CORRECT!!
        })
        .returning()
        .execute()
    )[0];
    if (!item) {
      //   return serverError(req, "error", 500);
      console.error("ERROR");
    }
    // const url = list.id
    // list = (
    //   await db
    //     .update(listing)
    //     .set()
    //     .where(eq(listing.id, list.id))
    //     .returning()
    //     .execute()
    // )[0]!;

    return item.id!;
  } catch (error) {
    console.log(error);
  }
}, zod$(productSchema));

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

export const useUpdateProduct = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("Error occurred");
  }
  await db
    .update(product)
    .set({
      title: data.title,
      price: data.price,
      description: data.description,
    })
    .where(
      and(eq(product.id, data.id), eq(product.authorId, session!.user.id)),
    );
}, zod$(updateProductSchema));

// Delete queries
export const useDeleteProduct = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("ERROR");
  }
  await db
    .delete(product)
    .where(
      and(eq(product.id, data.id), eq(product.authorId, session!.user.id)),
    );
}, zod$(deleteProductAndListingSchema));

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

export const useAddToCart = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("Error occurred");
  }
  await db
    .insert(cartItem)
    .values({
      authorId: session?.user.id!,
      listingId: data.listingId,
    })
    .execute();
}, zod$(addToCartSchema));

export const getUserCartItems = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    console.log("Error occurred");
  }
  return await db.query.cartItem
    .findMany({
      with: {
        listing: true,
      },
      where: eq(cartItem.authorId, session?.user.id!),
    })
    .execute();
});
