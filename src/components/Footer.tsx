import { component$ } from "@builder.io/qwik";
import { creators } from "~/utils/constants";

const footer = component$(() => {
  return (
    <footer class=" w-full h-20 flex justify-start items-center gap-2 px-10 border-t border-t-hex-00000050 border-t-solid">
      Made with ❤️ by :
      {creators.map((creator, i) => {
        return <p key={i}>{creator.name}</p>;
      })}
    </footer>
  );
});
export default footer;
