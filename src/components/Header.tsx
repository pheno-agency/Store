import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import CartIcon from "~/media/icons/cart-icon.svg";
import BackIcon from "~/media/icons/undo-icon.svg";
import UserIcon from "~/media/icons/user-icon.svg";
import PlusIcon from "~/media/icons/plus-icon.svg";
import { useLocation } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";

const header = component$(() => {
  const location = useLocation();
  const isAuthorized = useAuthSession();
  const signout = useAuthSignout();

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
      <div class="flex gap-2 justify-center items-center">
        {isAuthorized.value?.user ? (
          <>
            <a href="/listings">
              <Image src={PlusIcon} alt="cart icon" width={20} height={20} />
            </a>
            <a
              href="/cart"
              class="relative h-full flex justify-center items-center mr-2"
            >
              <Image src={CartIcon} alt="cart icon" width={20} height={20} />
            </a>
            <button
              onClick$={() => signout.submit({})}
              class="w-20 h-8 !bg-gradient-to-r !from-#1E18CF !from-50% !to-#625DDD !to-100% !text-#fff border-none rounded-2 text-3 font-normal unselectable cursor-pointer"
            >
              bye bye
            </button>
          </>
        ) : location.url.pathname === "/register/" ? null : (
          <a
            href="/register"
            class="relative h-full flex justify-center items-center"
          >
            <Image src={UserIcon} alt="cart icon" width={20} height={20} />
          </a>
        )}
      </div>
    </header>
  );
});
export default header;
