import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { useForm, zodForm$ } from "@modular-forms/qwik";
import { listingSchema } from "./schema";
import { type z } from "@builder.io/qwik-city";
import { useCreateListing } from "../../services/listing";
const CreateListing = component$(({ isOpen }: { isOpen: Signal }) => {
  type ListingInfo = z.infer<typeof listingSchema>;
  const [, { Form, Field }] = useForm<ListingInfo>({
    loader: {
      value: {
        title: "",
      },
    },
    validate: zodForm$(listingSchema),
  });
  const createListing = useCreateListing();
  return (
    <Form
      onSubmit$={(values) => {
        createListing.submit(values);
        isOpen.value = false;
      }}
      class="flex justify-between items-start w-full w-full p-4 rounded-2 border border-solid"
    >
      ADD NEW LIST
      <Field name="title">
        {(field, props) => (
          <div class="flex flex-col justify-start items-start gap-2">
            <label for="list">List name</label>
            <input
              {...props}
              type="text"
              name="list"
              id="list"
              class="h-8 rounded-2"
              value={field.value}
            />
          </div>
        )}
      </Field>
      <button type="submit">Add list</button>
    </Form>
  );
});
export default CreateListing;
