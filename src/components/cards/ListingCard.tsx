import { component$ } from "@builder.io/qwik";

interface ProductProps {
  title: string;
}

const ListingCard = component$<ProductProps>(({ title }) => {
  return (
    <a
      href="/listing"
      class="flex flex-col items-center justify-center w-100px h-100px border rounded-8px bg-white"
    >
      <p class="text-20px font-500 text-black my-0">{title}</p>
    </a>
  );
});
export default ListingCard;
