import { component$, useResource$ } from "@builder.io/qwik";
import { getListingProducts } from "~/services/listing";

export default component$(() => {
  // const listingProducts = useResource$(()=>{
  //   const products = getListingProducts()
  //   return products
  // })
  return <div>Hello Qwik!</div>;
});
