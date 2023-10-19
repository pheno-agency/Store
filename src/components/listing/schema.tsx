// validation schema functions for Signin and Signup
import { z } from "@builder.io/qwik-city";

export const listingSchema = z.object({
  title: z.string().min(1, "Please enter list name"),
});
export const productSchema = z.object({
  title: z.string().min(1, "Please enter product name"),
  description: z.string().min(1, "Please enter description"),
  price: z.number().min(1, "Please enter product price"),
});
