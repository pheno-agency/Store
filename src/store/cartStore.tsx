import { type Signal, createContextId } from "@builder.io/qwik";

export const cartContext = createContextId<Signal<string[]>>("cart-context");
