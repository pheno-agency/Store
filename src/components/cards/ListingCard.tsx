import { component$ } from "@builder.io/qwik";

interface ProductProps {
  title: string;
  id: number;
}

const ListingCard = component$<ProductProps>(({ title, id }) => {
  return (
    <a
      href={`/listings/${id}`}
      class="flex flex-col items-center justify-center w-150px h-150px border  border-solid rounded-8px bg-white gap-1rem"
    >
      <p class="text-20px font-500 text-black my-0">{title}</p>
      {/* <p class="text-16px font-500 text-black my-0">{seller}</p> */}
    </a>
  );
});
export default ListingCard;
