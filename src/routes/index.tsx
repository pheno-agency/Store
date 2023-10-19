import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="grid grid-cols-3 grid-rows-1 gap-10  max-w-1440px mx-auto <lg:grid-cols-2 <md:grid-cols-1 <md:max-w-375px">
      {[1, 2, 3, 4, 5].map((el, i) => {
        return (
          <div key={i} class="bg-sky-300">
            {el}
          </div>
        );
      })}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
