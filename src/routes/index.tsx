import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ListingCard from "~/components/cards/ListingCard";

export default component$(() => {
  return (
    <div class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full">
      {[1, 2, 3, 4, 5].map((el, i) => {
        return <ListingCard key={i} title="sdgffdsfgds" seller="dfdsf" />;
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
