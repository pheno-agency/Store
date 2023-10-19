// validation schema functions for Signin and Signup
import { z } from "@builder.io/qwik-city";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("The email address is badly formatted."),
  password: z
    .string()
    .nonempty("Please enter your password")
    .min(8, "Password is too short!."),
});

export const signupSchema = z.object({
  name: z.string().nonempty("Please enter your name"),
  email: z
    .string()
    .nonempty("Please enter your email")
    .email("The email address is badly formatted."),
  password: z
    .string()
    .nonempty("Please enter your password")
    .min(8, "Password is too short!."),
  terms: z.boolean({
    required_error: "You must be agree with terms!",
  }),
});
