import { $, type QRL, component$ } from "@builder.io/qwik";
import { type SubmitHandler, useForm, zodForm$ } from "@modular-forms/qwik";
import { productSchema } from "./schema";
import { type z } from "@builder.io/qwik-city";
import coverImg from "../../media/cover-img.png";
import { Image } from "@unpic/qwik";
import { useDeleteProduct, useUpdateProduct } from "../../services/product";
import ButtonLoader from "../ButtonLoader";

interface EditableProductProps {
  title?: string;
  description?: string;
  price?: number;
  productId: number;
}
const EditableProduct = component$(
  ({ title, description, price, productId }: EditableProductProps) => {
    const deleteProduct = useDeleteProduct();
    const updateProduct = useUpdateProduct();
    type productInfo = z.infer<typeof productSchema>;
    const [, { Form, Field }] = useForm<productInfo>({
      loader: {
        value: {
          title: title ?? "",
          description: description ?? "",
          price: price ?? 0,
        },
      },
      validate: zodForm$(productSchema),
    });
    const updateProductHandler: QRL<SubmitHandler<productInfo>> = $(
      async (values) => {
        await updateProduct.submit({
          id: productId,
          title: values.title,
          price: values.price,
          description: values.description,
        });
      },
    );
    return (
      <Form
        onSubmit$={updateProductHandler}
        class="w-170px h-260px border border-solid rounded-8px flex flex-col justify-center items-center gap-1"
      >
        <Image
          src={coverImg}
          width={30}
          height={30}
          // alt={name}
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
            {updateProduct.isRunning ? (
              <ButtonLoader buttonLoaderStyles="![&>*]:bg-black" />
            ) : (
              "edit"
            )}
          </button>
          <button
            type="button"
            onClick$={() => deleteProduct.submit({ id: productId })}
            class="relative w-5rem h-1.5rem"
          >
            {deleteProduct.isRunning ? (
              <ButtonLoader buttonLoaderStyles="![&>*]:bg-black" />
            ) : (
              "delete"
            )}
          </button>
        </div>
      </Form>
    );
  },
);
export default EditableProduct;
