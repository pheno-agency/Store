import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Signin from "~/components/forms/Signin";
import Signup from "~/components/forms/Signup";

export default component$(() => {
  const changeForm = useSignal(true);
  const changeFormToSignin = $(() => {
    changeForm.value = true;
  });
  const changeFormToSignup = $(() => {
    changeForm.value = false;
  });
  const formTypeButtons =
    "w-50% h-100% border-none text-2.5 font-medium text-black no-underline bg-transparent cursor-pointer z-2";

  return (
    <div class="flex flex-col items-center gap-5 w-full h-full">
      {/* sign in & sign up buttons */}
      <div class="relative flex items-center justify-around w-44 h-8 bg-#fff rounded-2 border-1 border-solid border-#E0E0E2 cursor-pointer">
        <div
          class={`absolute w-50% h-100% bg-#f4f4f4 duration-500 ${
            changeForm.value
              ? "left-0 rounded-l-2 border-r-1"
              : "left-50% rounded-r-2 border-l-1"
          }`}
        ></div>
        <button onClick$={changeFormToSignin} class={formTypeButtons}>
          Sign in
        </button>
        <button onClick$={changeFormToSignup} class={formTypeButtons}>
          Sign up
        </button>
      </div>

      {changeForm.value ? <Signin /> : <Signup />}

      {changeForm.value ? (
        <p class="text-#8C8C8C text-2.5">
          Don't have an account?{" "}
          <button
            onClick$={changeFormToSignup}
            class=" h-8 font-Poppins !bg-gradient-to-r !from-#1E18CF !from-50% !to-#625DDD !to-100% !text-#fff border-none rounded-2 text-3 font-normal text-#3A3A3A font-medium cursor-pointer"
          >
            Sign up
          </button>
        </p>
      ) : null}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Register",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
