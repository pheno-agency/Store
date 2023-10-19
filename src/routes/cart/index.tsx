import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { cartContext } from "~/store/cartStore";

export default component$(() => {
  const cartData = useContext(cartContext);
  return (
    <div>
      {cartData.value.map((list, i) => {
        return <div key={i}>{list}</div>;
      })}
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
