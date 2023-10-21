import { globalAction$, server$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { cartItem } from "~/db/schema/cartItem";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";
import { addToCartSchema, deleteFromCartSchema } from "~/utils/schema";

export const useAddToCart = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("Error occurred");
    return;
  }
  const cartItemExists = !!(await db.query.cartItem
    .findFirst({
      where: and(
        eq(cartItem.authorId, session.user.id),
        eq(cartItem.listingId, data.listingId),
      ),
    })
    .execute());

  if (cartItemExists) {
    return;
  }

  await db
    .insert(cartItem)
    .values({
      authorId: session.user.id,
      listingId: data.listingId,
    })
    .execute();
}, zod$(addToCartSchema));

export const getUserCartItems = server$(async function () {
  const { db } = await createClient(this);
  const session = getSession(this);
  if (!session) {
    return [];
  }
  return await db.query.cartItem
    .findMany({
      with: {
        listing: true,
      },
      where: eq(cartItem.authorId, session.user.id),
    })
    .execute();
});

export const useDeleteFromCart = globalAction$(async function (data, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("ERROR");
  }
  await db
    .delete(cartItem)
    .where(
      and(
        eq(cartItem.listingId, data.listingId),
        eq(cartItem.authorId, session!.user.id),
      ),
    );
}, zod$(deleteFromCartSchema));

export const useCheckout = globalAction$(async function (_, req) {
  const { db } = await createClient(req);
  const session = getSession(req);
  if (!session) {
    console.log("ERROR");
  }
  await db.delete(cartItem).where(eq(cartItem.authorId, session!.user.id));
});
