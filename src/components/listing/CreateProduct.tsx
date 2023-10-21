import type { Signal } from "@builder.io/qwik";
import { $, type QRL, component$ } from "@builder.io/qwik";
import { type SubmitHandler, useForm, zodForm$ } from "@modular-forms/qwik";
import { productSchema } from "./schema";
import { type z } from "@builder.io/qwik-city";
import coverImg from "../../media/cover-img.png";
import { Image } from "@unpic/qwik";
import { useCreateProduct } from "../../services/product";
import ButtonLoader from "../ButtonLoader";

interface CreateProductProps {
  id: number;
  currentOpenListing: Signal<number | null>;
}
const CreateProduct = component$(
  ({ id, currentOpenListing }: CreateProductProps) => {
    type productInfo = z.infer<typeof productSchema>;
    const [, { Form, Field }] = useForm<productInfo>({
      loader: {
        value: {
          title: "",
          description: "",
          price: 0,
        },
      },
      validate: zodForm$(productSchema),
    });
    const createProduct = useCreateProduct();
    const createProductHandler: QRL<SubmitHandler<productInfo>> = $(
      async (values) => {
        await createProduct.submit({
          title: values.title,
          price: values.price,
          description: values.description,
          cover: "",
          listingId: id,
        });
        currentOpenListing.value = null;
      },
    );
    return (
      <Form
        onSubmit$={createProductHandler}
        class="w-170px h-260px border border-solid rounded-8px flex flex-col justify-center items-center gap-1"
      >
        <Image
          src={coverImg}
          width={30}
          height={30}
          class="w-100% h-100px mx-auto"
        />
        <div class="flex flex-col justify-between items-center w-full ">
          <Field name="title">
            {(field, props) => (
              <div class="flex flex-col justify-start items-start w-full">
                <label for="productName" class="text-10px">
                  Product name
                </label>
                <input
                  {...props}
                  type="text"
                  name="productName"
                  id="productName"
                  class="h-6 rounded-1 w-full"
                  maxLength={20}
                  value={field.value}
                />
              </div>
            )}
          </Field>
          <Field name="price" type="number">
            {(field, props) => (
              <div class="flex flex-col justify-start items-start w-full">
                <label for="productPrice" class="text-10px">
                  Product price
                </label>
                <input
                  {...props}
                  type="number"
                  name="productPrice"
                  id="productPrice"
                  class="h-6 rounded-1 w-full"
                  value={field.value}
                />
              </div>
            )}
          </Field>
          <Field name="description">
            {(field, props) => (
              <div class="flex flex-col justify-start items-start w-full">
                <label for="productDis" class="text-10px">
                  Product description
                </label>
                <textarea
                  {...props}
                  name="productPrice"
                  id="productPrice"
                  class="rounded-1 w-full resize-none h-10"
                  maxLength={30}
                  value={field.value}
                />
              </div>
            )}
          </Field>
        </div>
        <div class="flex justify-center items-center gap-2">
          <button type="submit" class="relative w-5rem h-1.5rem">
            {createProduct.isRunning ? (
              <ButtonLoader buttonLoaderStyles="![&>*]:bg-black" />
            ) : (
              "create"
            )}
          </button>
        </div>
      </Form>
    );
  },
);
export default CreateProduct;
