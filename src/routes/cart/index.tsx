import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link } from "@builder.io/qwik-city";
import ProductCard from "~/components/cards/ProductCard";
import { getListingProducts } from "../../services/listing";
import { getUserCartItems } from "../../services/cart";
export const useGetUserCartItem = routeLoader$((req) => {
  return getUserCartItems.apply(req);
});
export default component$(() => {
  const userCartItems = useGetUserCartItem();
  const listingsResource = useResource$(() => {
    return Promise.all(
      userCartItems.value
        ?.map(async ({ listing }) => ({
          title: listing.title,
          products: await getListingProducts(listing.id),
        }))
        .filter(async (p) => Boolean(await p)) ?? [],
    );
  });
  return (
    <div class="flex flex-col items-center justify-between">
      <Resource
        value={listingsResource}
        onPending={() => <p>loading...</p>}
        onResolved={(listings) =>
          listings.length > 0 ? (
            <>
              {listings.map((listing) => (
                <div
                  key={listing.title}
                  class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full"
                >
                  <span>{listing.title}</span>
                  {listing.products?.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                      />
                    );
                  })}
                </div>
              ))}

              <div class="flex justify-between items-center w-full">
                <p class="text-20px text-black">
                  Subtotal : $
                  {listings
                    .flatMap((l) => l.products)
                    .reduce(
                      (total, product) => total + (product?.price ?? 0),
                      0,
                    )
                    .toFixed(3)}
                </p>
                <Link
                  class="w-80px h-32px flex justify-center items-center text-black bg-white border border-solid rounded-8px"
                  href="/"
                >
                  checkout
                </Link>
              </div>
            </>
          ) : (
            <p class="text-25px text-black">
              You have no items in your shopping cart,
              <Link class="!text-red" href="/">
                start adding some
              </Link>
              !
            </p>
          )
        }
      />
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
