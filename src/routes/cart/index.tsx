import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import { cartContext } from "~/store/cartStore";
import { userListings } from "../../utils/constants";
import ProductCard from "~/components/cards/ProductCard";
export default component$(() => {
  // const cartData = useContext(cartContext);
  return (
    <div class="flex flex-col items-center justify-between">
      {userListings[0].products.length > 0 ? (
        <>
          <div class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full">
            {userListings[0].products.map((list) => {
              return (
                <ProductCard
                  key={list.id}
                  title={list.title}
                  price={list.price}
                  description={list.description}
                />
              );
            })}
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="text-20px text-black">
              Subtotal : $
              {userListings[0].products
                .reduce((total, product) => total + product.price, 0)
                .toFixed(3)}
            </p>
            <a
              class="w-80px h-32px flex justify-center items-center text-black bg-white border border-solid rounded-8px"
              href="/"
            >
              checkout
            </a>
          </div>
        </>
      ) : (
        <p class="text-25px text-black">
          You have no items in your shopping cart,
          <a class="!text-red" href="/">
            start adding some
          </a>
          !
        </p>
      )}
    </div>
  );
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
