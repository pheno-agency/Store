import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <>cart page</>;
});

export const head: DocumentHead = {
  title: "Cart",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
