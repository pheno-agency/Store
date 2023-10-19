import { globalAction$, server$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { listingSchema, productSchema } from "~/components/forms/Schema";
import { listing } from "~/db/schema/listing";
import { product } from "~/db/schema/product";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";

// TODO: get listingProduct

export const getListings = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    // return serverError(this, "error", 403);
    return [];
  }

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
    const userListings = await db
      .select()
      .from(listing)
      .where(eq(listing.authorId, session.user.id));
    return userListings;
  } catch {
    // return serverError(this, "Getting data faild", 500);
    console.error("ERROR");
  }
});

export const getListingProducts = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    // return serverError(this, "error", 403);
    return [];
  }

  try {
    const listingProducts = await db
      .select()
      .from(product)
      .where(eq(product.listingId, listing.id));
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
    let list = (
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
    let item = (
      await db
        .insert(product)
        .values({
          title: data.title,
          price: data.price,
          description: data.description,
          author: session?.user.id,
          cover: data.cover,
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

export const updateProductTitle = server$(async function (
  id: number,
  newTitle: string
) {
  const { db } = await createClient(this);

  const session = getSession(this);
  if (!session) {
    //   return serverError(this, "error", 403);
    console.log("Error");
  }

  await db
    .update(product)
    .set({ title: newTitle })
    .where(eq(product.id, id))
    .where(eq(product.author, session!.user.id))
    .execute();
});

export const updateProductPrice = server$(async function (
  id: number,
  newPrice: number
) {
  const { db } = await createClient(this);

  const session = getSession(this);
  if (!session) {
    //   return serverError(this, "Anonymous creation is not implemented yet", 403);
    console.log("Error");
  }

  await db
    .update(product)
    .set({ price: newPrice })
    .where(eq(product.id, id))
    .where(eq(product.author, session!.user.id))
    .execute();
});

export const deleteProduct = server$(async function (id: number) {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    console.log("ERROR");
  }
  await db
    .delete(product)
    .where(and(eq(product.id, id), eq(product.author, session!.user.id)));
});