import { globalAction$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { productSchema } from "~/components/forms/Schema";
import { product } from "~/db/schema/product";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";
import {
  deleteProductAndListingSchema,
  updateProductSchema,
} from "~/utils/schema";

export const useCreateProduct = globalAction$(async (data, req) => {
  const { db } = await createClient(req);
  const session = getSession(req);

  if (!session) {
    console.error("ERROR");
    return;
  }
  try {
    const item = (
      await db
        .insert(product)
        .values({
          title: data.title,
          price: data.price,
          description: data.description,
          authorId: session.user.id,
          listingId: data.listingId,
        })
        .returning()
        .execute()
    )[0];
    if (!item) {
      console.error("ERROR");
    }

    return item.id!;
  } catch (error) {
    console.log(error);
  }
}, zod$(productSchema));

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
      and(eq(product.id, data.id), eq(product.authorId, session!.user.id))
    );
}, zod$(updateProductSchema));

export const useDeleteProduct = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("ERROR");
    return;
  }
  await db
    .delete(product)
    .where(and(eq(product.id, data.id), eq(product.authorId, session.user.id)));
}, zod$(deleteProductAndListingSchema));
