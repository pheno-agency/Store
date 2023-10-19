import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import ProductCard from "~/components/cards/ProductCard";
import { getListingProducts } from "~/services/listing";

export const useListingProducts = routeLoader$((req) => {
  return getListingProducts(Number(req.params.id));
});

export default component$(() => {
  const listingProducts = useListingProducts();
  console.log("first", listingProducts.value);
  return (
    <div>
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
    </div>
  );
});
