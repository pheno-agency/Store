import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Styles from "./ButtonLoader.css?inline";

interface ButtonLoaderProps {
  buttonLoaderStyles?: string;
}

const ButtonLoader = component$<ButtonLoaderProps>(({ buttonLoaderStyles }) => {
  useStylesScoped$(Styles);
  return (
    <div id="loader" class={buttonLoaderStyles}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
});

export default ButtonLoader;
