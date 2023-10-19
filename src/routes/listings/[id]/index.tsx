import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import ProductCard from "~/components/cards/ProductCard";
import { getListingProducts } from "~/services/listing";

export const useListingProducts = routeLoader$((req) => {
  return getListingProducts(Number(req.params.id));
});

export default component$(() => {
  const listingProducts = useListingProducts();
  return listingProducts.value!.length > 0 ? (
    <div class="flex justify-start items-start gap-7 flex-wrap border border-solid rounded-4 p-2">
      {listingProducts.value?.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description!}
          />
        );
      })}
      <button class="self-end ml-auto mr-4">add to cart</button>
    </div>
  ) : (
    <p class="text-20px w-full text-center">this listing has no product yet</p>
  );
});
