import { component$, useSignal } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import CartIcon from "~/media/icons/cart-icon.svg";
import BackIcon from "~/media/icons/undo-icon.svg";
import UserIcon from "~/media/icons/user-icon.svg";
import { Link, useLocation } from "@builder.io/qwik-city";

const header = component$(() => {
  const location = useLocation();
  const isAuthorized = useSignal(true);
  return (
    <header class="shadow-lg w-full h-20 flex justify-between items-center px-10">
      <a href="/" class="h-full flex justify-center items-center text-20px">
        {location.url.pathname === "/cart/" ||
        location.url.pathname === "/register/" ? (
          <Image src={BackIcon} alt="back icon" width={20} height={20} />
        ) : (
          "Home"
        )}
      </a>
      {isAuthorized.value ? (
        location.url.pathname === "/cart/" ? (
          <p class=" text-blue-900 flex justify-center items-center text-18px rounded-full">
            you add 10 product
          </p>
        ) : (
          <Link
            href="/cart"
            class="relative h-full flex justify-center items-center"
          >
            <p class="absolute top-1 -right-3 w-20px h-20px bg-red-500 text-white flex justify-center items-center text-14px rounded-full">
              10
            </p>
            <Image src={CartIcon} alt="cart icon" width={20} height={20} />
          </Link>
        )
      ) : location.url.pathname === "/register/" ? null : (
        <Link
          href="/register"
          class="relative h-full flex justify-center items-center"
        >
          <Image src={UserIcon} alt="cart icon" width={20} height={20} />
        </Link>
      )}
    </header>
  );
});
export default header;
