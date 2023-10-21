import { z } from "@builder.io/qwik-city";

export const deleteProductAndListingSchema = z.object({ id: z.number() });

export const updateProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
});
export const updateListingSchema = z.object({
  id: z.number(),
  title: z.string(),
});
export const addToCartSchema = z.object({
  listingId: z.number(),
});
export const deleteFromCartSchema = addToCartSchema;
