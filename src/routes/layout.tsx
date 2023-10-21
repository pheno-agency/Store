import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { createClient } from "~/db/schema/utils";
import { getUserCartItems } from "~/services/cart";

export const onRequest: RequestHandler = (req) => {
  // create client from the first request, so we don't wait for it later
  createClient(req);
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});
export const useGetUserCartItem = routeLoader$((req) => {
  return getUserCartItems.apply(req);
});
export default component$(() => {
  return (
    <>
      <Header />
      <main class="p-10 h-[calc(100vh-10rem)] overflow-y-auto">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
