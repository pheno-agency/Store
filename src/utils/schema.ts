import { z } from "@builder.io/qwik-city";

export const deleteProductAndListingSchema = z.object({ id: z.number() });

export const updateProductAndListingSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
});
