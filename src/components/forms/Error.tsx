import { Slot, component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import ErrorIcon from "~/media/icons/error.svg";

interface ErrorProps {
  class?: string;
}

const Error = component$((props: ErrorProps) => {
  return (
    <div class={`flex items-center gap-1 absolute ${props.class}`}>
      <Image src={ErrorIcon} alt="error icon" width={12} height={12} />
      <div class="w-60 text-2 font-medium text-red-500">
        {/* {field.error} */}
        <Slot name="errorText" />
      </div>
    </div>
  );
});

export default Error;
