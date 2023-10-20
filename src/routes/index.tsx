import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ListingCard from "~/components/cards/ListingCard";
import { getListings } from "../services/listing";
export const useGetListings = routeLoader$(async () => {
  return getListings();
});
export default component$(() => {
  const listings = useGetListings();

  return (
    <div class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full">
      {listings.value?.map((listing, i) => {
        return <ListingCard key={i} title={listing.title} id={listing.id} />;
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
