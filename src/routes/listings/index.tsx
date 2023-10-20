import { $, component$, useSignal } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import CreateListing from "~/components/listing/CreateListing";
import CreateProduct from "~/components/listing/CreateProduct";
import EditableProduct from "~/components/listing/EditableProduct";
import { getUserListings } from "~/services/listing";
import { useDeleteListing } from "~/services/listing";
export const useGetUserListings = routeLoader$(async (req) => {
  return getUserListings.apply(req);
});

export default component$(() => {
  // const useUpdateListing = useUpdateListing()
  const deleteListing = useDeleteListing();
  const userListings = useGetUserListings();
  const isOpen = useSignal(false);
  const createProduct = useSignal(false);
  const nav = useNavigate();

  const Inputs = useSignal({
    listNameInput: "",
    productName: "",
    description: "",
  });
  const nameHandler = $((e: { target: HTMLInputElement }) => {
    Inputs.value.listNameInput = (e.target as HTMLInputElement).value;
  });
  return (
    <div class="flex flex-wrap justify-center items-center gap-4 p-20px mx-auto w-full">
      <button
        class="w-20 h-8 !bg-gradient-to-r !from-#1E18CF !from-50% !to-#625DDD !to-100% !text-#fff border-none rounded-2 text-3 font-normal unselectable cursor-pointer"
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        {isOpen.value ? "Cancel" : "New list"}
      </button>
      {isOpen.value ? <CreateListing /> : null}
      {userListings.value?.map((listing) => {
        return (
          <div
            key={listing.id}
            class="flex flex-col justify-start items-start gap-4 w-full p-4 rounded-2 border border-solid "
          >
            <div class="flex justify-between items-start w-full">
              <div class="flex flex-col justify-start items-start gap-2">
                <label for="list">List name</label>
                <input
                  onChange$={nameHandler}
                  type="text"
                  name="list"
                  id="list"
                  class="h-8 rounded-2"
                  value={listing.title}
                />
              </div>
              <div>
                <button>save list</button>
                <button
                  onClick$={async () => {
                    await deleteListing.submit({ id: listing.id });
                    await nav();
                  }}
                >
                  delete list
                </button>
              </div>
            </div>
            <div class="flex justify-start items-center flex-wrap gap-6 min-h-60 ">
              <button
                onClick$={() => {
                  createProduct.value = !createProduct.value;
                }}
                class="w-170px h-260px border border-solid rounded-8px flex justify-center items-center"
              >
                add new product
              </button>
              {createProduct.value ? <CreateProduct id={listing.id} /> : null}
              {listing.products.map((product) => {
                return (
                  <EditableProduct
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description ?? ""}
                    productId={product.id}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Listing",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
