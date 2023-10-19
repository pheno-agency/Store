import { z } from "@builder.io/qwik-city";

export const deleteProductSchema = z.object({ id: z.number() });
export const deleteListingSchema = z.object({ id: z.number() });
