import { globalAction$, server$, zod$ } from "@builder.io/qwik-city";
import { and, eq } from "drizzle-orm";
import { cartItem } from "~/db/schema/cartItem";
import { createClient } from "~/db/schema/utils";
import { getSession } from "~/routes/plugin@auth";
import { addToCartSchema } from "~/utils/schema";

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
    console.log("Error occurred");
    return;
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
