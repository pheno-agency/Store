import { component$ } from "@builder.io/qwik";
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import ProductCard from "~/components/cards/ProductCard";
import { getListingProducts } from "~/services/listing";
import { useAddToCart, useDeleteFromCart } from "~/services/cart";
import { useAuthSession } from "~/routes/plugin@auth";
import ButtonLoader from "~/components/ButtonLoader";
import { useGetUserCartItem } from "~/routes/layout";

export const useListingProducts = routeLoader$((req) => {
  return getListingProducts(Number(req.params.id));
});

export default component$(() => {
  const listingProducts = useListingProducts();
  const location = useLocation();
  const nav = useNavigate();
  const addToCart = useAddToCart();
  const deleteFromCart = useDeleteFromCart();
  const isAuthorized = useAuthSession();
  const userCartItems = useGetUserCartItem();

  const alreadyAdded = userCartItems.value
    .map((cartItem) => cartItem.listingId)
    .includes(Number(location.params.id));
  const isLoading = addToCart.isRunning || deleteFromCart.isRunning;
  return listingProducts.value?.length ? (
    <div class="flex justify-start items-start gap-7 flex-wrap border border-solid rounded-4 p-2">
      {listingProducts.value.map((product) => {
        return (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description!}
          />
        );
      })}
      <div class="flex gap-2 self-end ml-auto">
        {isAuthorized.value ? null : "please login first to add to cart"}
        <button
          onClick$={() => {
            if (isAuthorized.value) {
              alreadyAdded
                ? deleteFromCart.submit({
                    listingId: Number(location.params.id),
                  })
                : addToCart.submit({ listingId: Number(location.params.id) });
              nav();
            } else {
              nav("/register");
            }
          }}
          class="relative w-30 h-1.5rem mr-4"
        >
          {isLoading ? (
            <ButtonLoader buttonLoaderStyles="![&>*]:bg-black" />
          ) : alreadyAdded ? (
            "Delete from cart"
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </div>
  ) : (
    <p class="text-20px w-full text-center">this listing has no product yet</p>
  );
});
