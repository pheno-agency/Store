import type { QRL } from "@builder.io/qwik";
import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, type z } from "@builder.io/qwik-city";

// Packages
import { type SubmitHandler, useForm, zodForm$ } from "@modular-forms/qwik";
import { Image } from "@unpic/qwik";

import Error from "./Error";
import { signinSchema } from "./Schema";

// Icons
import VisibleIcon from "~/media/icons/eye-on.svg";
import InVisibleIcon from "~/media/icons/eye-off.svg";
import EmailIcon from "~/media/icons/email.svg";
import { useAuthSignin } from "~/routes/plugin@auth";
import ButtonLoader from "../ButtonLoader";

type LoginForm = z.infer<typeof signinSchema>;

const Signin = component$(() => {
  const location = useLocation();
  const serverErrorMessage = location.url.searchParams.get("sign-in");
  useVisibleTask$(() => {
    const url = new URL(location.url);
    url.searchParams.delete("sign-in");
    window.history.replaceState({}, document.title, url.pathname);
  });
  const signin = useAuthSignin();
  const [, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { email: "", password: "" } },
    validate: zodForm$(signinSchema),
  });

  const submitHandler: QRL<SubmitHandler<LoginForm>> = $(
    async (credentials) =>
      await signin.submit({
        providerId: "credentials",
        options: { callbackUrl: "/", ...credentials },
      }),
  );

  const showPassword = useSignal(false);
  const passwordVisibilityHandler = $(() => {
    showPassword.value = !showPassword.value;
  });

  const inputStyle =
    "w-60 h-8 border-0.5 border-solid border-#E0E0E2 rounded-2 text-2.75 placeholder:font-Poppins placeholder:text-2.75 pl-3 focus:border-0.5 focus-border-solid focus:border-#b0b0b2 focus:outline-none";
  const errorStyle =
    "w-60 h-8 border-0.5 border-solid border-red-300 rounded-2 text-2.75 placeholder:font-Poppins placeholder:text-2.75 pl-3 focus:border-0.5 focus-border-solid focus:border-#DE4242 focus:outline-none";

  return (
    <Form onSubmit$={submitHandler} class="flex flex-col items-center gap-5">
      <Field name="email">
        {(field, props) => (
          <div class="relative">
            <div class="relative flex items-center">
              <input
                {...props}
                type="email"
                placeholder="Email"
                class={`${field.error ? errorStyle : inputStyle}`}
                value={field.value}
              />
              <Image
                src={EmailIcon}
                alt="email icon"
                width={12}
                height={12}
                class="absolute right-3.75"
              />
            </div>
            {field.error ? (
              <Error class="-mt-1">
                <p q:slot="errorText">{field.error}</p>
              </Error>
            ) : null}
          </div>
        )}
      </Field>

      <Field name="password">
        {(field, props) => (
          <div>
            <div class="relative flex items-center">
              <input
                {...props}
                type={showPassword.value ? "text" : "password"}
                placeholder="Password"
                class={`${field.error ? errorStyle : inputStyle}`}
                value={field.value}
              />
              <button
                type="button"
                onClick$={passwordVisibilityHandler}
                class="h-4 bg-#fff border-none absolute right-2.5 cursor-pointer unselectable "
              >
                {showPassword.value ? (
                  <Image
                    src={InVisibleIcon}
                    alt="ImVisibleIcon"
                    width={12}
                    height={12}
                  />
                ) : (
                  <Image
                    src={VisibleIcon}
                    alt="visblity icon"
                    width={12}
                    height={12}
                  />
                )}
              </button>
            </div>
            {field.error ? (
              <Error class="-mt-1">
                <p q:slot="errorText">{field.error}</p>
              </Error>
            ) : null}

            {!field.error && serverErrorMessage && (
              <Error class="-mt-1">
                <p q:slot="errorText">{serverErrorMessage}</p>
              </Error>
            )}
          </div>
        )}
      </Field>

      {/* submit button */}
      <button
        type="submit"
        class="relative w-59.5 h-8 font-Poppins !bg-gradient-to-r !from-#1E18CF !from-50% !to-#625DDD !to-100% !text-#fff border-none rounded-2 text-3 font-normal unselectable cursor-pointer"
      >
        {signin.isRunning ? <ButtonLoader /> : "Continue"}
      </button>

      <div class="flex items-center">
        <div class="border-t-1 border-t-solid border-t-black opacity-9 w-25 mr-1"></div>
        <p class="text-2.5 font-normal font-Poppins">OR</p>
        <div class="border-t-1 border-t-solid border-t-black opacity-9 w-25 ml-1"></div>
      </div>
    </Form>
  );
});

export default Signin;
