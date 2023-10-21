import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import CartIcon from "~/media/icons/cart-icon.svg";
import BackIcon from "~/media/icons/undo-icon.svg";
import UserIcon from "~/media/icons/user-icon.svg";
import PlusIcon from "~/media/icons/plus-icon.svg";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";
import ButtonLoader from "./ButtonLoader";
import { useGetUserCartItem } from "~/routes/layout";

const header = component$(() => {
  const location = useLocation();
  const isAuthorized = useAuthSession();
  const signout = useAuthSignout();
  const userCartItems = useGetUserCartItem();
  return (
    <header class="shadow-lg w-full h-20 flex justify-between items-center px-10">
      <Link
        href="/"
        prefetch
        class="h-full flex justify-center items-center text-20px"
      >
        {location.url.pathname === "/cart/" ||
        location.url.pathname === "/register/" ? (
          <Image src={BackIcon} alt="back icon" width={20} height={20} />
        ) : (
          "Home"
        )}
      </Link>
      <div class="flex gap-2 justify-center items-center">
        {isAuthorized.value?.user ? (
          <>
            <Link href="/listings" prefetch>
              <Image src={PlusIcon} alt="cart icon" width={20} height={20} />
            </Link>
            <Link
              href="/cart"
              prefetch
              class="relative h-full flex justify-center items-center mr-2"
            >
              {userCartItems.value.length ? (
                <p class="bg-red-500 rounded-full absolute -top-2 mt-0 -right-3 w-20px h-20px text-14px text-white flex justify-center items-center font-normal">
                  {userCartItems.value.length}
                </p>
              ) : null}
              <Image src={CartIcon} alt="cart icon" width={20} height={20} />
            </Link>
            <button
              onClick$={() => signout.submit({})}
              class="relative w-20 h-8 !bg-gradient-to-r !from-#1E18CF !from-50% !to-#625DDD !to-100% !text-#fff border-none rounded-2 text-3 font-normal unselectable cursor-pointer"
            >
              {signout.isRunning ? <ButtonLoader /> : "Bye Bye"}
            </button>
          </>
        ) : location.url.pathname === "/register/" ? null : (
          <Link
            href="/register"
            prefetch
            class="relative h-full flex justify-center items-center"
          >
            <Image src={UserIcon} alt="cart icon" width={20} height={20} />
          </Link>
        )}
      </div>
    </header>
  );
});
export default header;
