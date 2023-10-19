import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { userListings } from "~/utils/constants";
import ProductCard from "~/components/cards/ProductCard";
import { Image } from "@unpic/qwik";
import coverImg from "../../media/cover-img.png";

export default component$(() => {
  const isOpen = useSignal(false);
  const createProduct = useSignal(false);

  const Inputs = useSignal({
    listNameInput: "",
    productName: "",
    description: "",
  });
  const listingsData = useSignal(userListings);
  const nameHandler = $((e: { target: HTMLInputElement }) => {
    Inputs.value.listNameInput = (e.target as HTMLInputElement).value;
  });
  const DeleteListingHandler = $((id: number) => {
    listingsData.value = listingsData.value.filter((i) => i.id !== id);
  });
  const SaveListing = $(() => {
    // const newProduct = {
    //   name: Inputs.value.productName,
    //   description: Inputs.value.description,
    //   price: ''
    //   // image: Inputs.value,
    // };
    const newListName = Inputs.value.listNameInput; // Get the input value
    if (newListName) {
      // Check if the input has a value
      listingsData.value = [
        ...listingsData.value,
        {
          id: listingsData.value.length + 1, // Generate a unique ID for the new list
          name: newListName, // Set the name to the input value
          products: [],
        },
      ];

      // Clear the input value
      Inputs.value.listNameInput = "";
    }
  });
  const saveProduct = $(() => {
    // const newProduct = {
    //   name: Inputs.value.productName,
    //   description: Inputs.value.description,
    //   price: "",
    //   // image: Inputs.value,
    // };

    // Check if the input has a value
    // listingsData.value = [
    //   ...listingsData.value,
    //   {
    //     id: listingsData.value.length + 1, // Generate a unique ID for the new list
    //     name: newListName, // Set the name to the input value
    //     products: [],
    //   },
    // ];
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
      {isOpen.value ? (
        <div class="flex flex-col justify-start items-start gap-4 w-full p-4 rounded-2 border border-solid ">
          <div class="flex justify-between items-start w-full">
            <div class="flex flex-col justify-start items-start gap-2">
              <label for="list">List name</label>
              <input type="text" name="list" id="list" class="h-8 rounded-2" />
            </div>
            <button onClick$={() => SaveListing()}>save list</button>
          </div>
          <div class="flex justify-start items-center flex-wrap gap-9 min-h-60 ">
            <button class="w-170px h-260px border border-solid rounded-8px flex justify-center items-center">
              add new product
            </button>
            {/* all  list products */}
            { }
          </div>
        </div>
      ) : null}
      {listingsData.value.map((listing) => {
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
                  value={listing.name}
                />
              </div>
              <div>
                <button>save list</button>
                <button onClick$={() => DeleteListingHandler(listing.id)}>
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
              {createProduct.value ? (
                <div class="w-170px h-260px border border-solid rounded-8px flex flex-col justify-center items-center">
                  <Image
                    src={coverImg}
                    width={30}
                    height={30}
                    // alt={name}
                    class="w-100% h-100px mx-auto"
                  />
                  <div class="flex flex-col justify-between items-center w-full ">
                    <div class="flex flex-col justify-start items-start gap-2 w-full">
                      <label for="productName">Product name</label>
                      <input
                        onChange$={nameHandler}
                        type="text"
                        name="productName"
                        id="productName"
                        class="h-6 rounded-2 w-full"
                      // value={listing.name}
                      />
                    </div>
                    <div class="flex flex-col justify-start items-start gap-2 w-full">
                      <label for="productPrice">Product price</label>
                      <input
                        onChange$={nameHandler}
                        type="number"
                        name="productPrice"
                        id="productPrice"
                        class="h-6 rounded-2 w-full"
                      // value={listin}
                      />
                    </div>
                    <div class="flex flex-col justify-start items-start gap-2 w-full">
                      <label for="productDis">Product price</label>
                      <textarea
                        // onChange$={nameHandler}
                        name="productPrice"
                        id="productPrice"
                        class="rounded-2 w-full"
                      // value={listin}
                      />
                    </div>
                    {/* <input class="text-20px text-black w-full" /> */}
                  </div>
                  <button onClick$={saveProduct}>save</button>
                </div>
              ) : null}
              {listing.products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
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
