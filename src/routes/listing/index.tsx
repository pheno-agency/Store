import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ProductCard from "~/components/cards/ProductCard";
import { getUserListings } from "~/services/listing";
const listingItem = [
  {
    id: 1,
    title: "sdgsdfg",
    price: "1000",
  },
  {
    id: 2,
    title: "sdgsdfg",
    price: "1000",
  },
  {
    id: 3,
    title: "sdgsdfg",
    price: "1000",
  },
  {
    id: 4,
    title: "sdgsdfg",
    price: "1000",
  },
  {
    id: 5,
    title: "sdgsdfg",
    price: "1000",
  },
  {
    id: 6,
    title: "sdgsdfg",
    price: "1000",
  },
];

export const useGetUserListings = routeLoader$(async () => {
  return getUserListings();
});

export default component$(() => {
  return (
    <div class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full">
      {listingItem.map((item) => {
        return (
          <ProductCard key={item.id} name={item.title} price={item.price} />
        );
      })}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Listing",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
