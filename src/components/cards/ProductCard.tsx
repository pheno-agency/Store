import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import basketSVG from "../../media/icons/cart-add-icon.svg";
import coverImg from "../../media/cover-img.png";

interface ProductProps {
  cover?: string;
  title: string;
  description?: string | null;
  price: number;
}

const ProductCard = component$<ProductProps>(
  ({ cover, title, description, price }) => {
    return (
      <div class="flex flex-col items-center w-170px h-260px border border-solid rounded-8px p-10px bg-white">
        {!cover ? (
          <Image
            src={coverImg}
            width={30}
            height={30}
            alt={title}
            class="w-100% h-100px mx-auto"
          />
        ) : (
          <Image
            src={cover}
            width={30}
            height={30}
            alt={title}
            class="w-100% h-100px mx-auto"
          />
        )}
        <div class="flex justify-between items-center w-full ">
          <p class="text-20px text-black">{title}</p>
          <p class="text-20px text-black">${price}</p>
        </div>
        <p class="text-16px text-black w-100% h-100% my-0">{description}</p>
        <button class="flex self-end p-0 bg-transparent mt-10px border-none">
          <Image src={basketSVG} width={30} height={30} />
        </button>
      </div>
    );
  },
);
export default ProductCard;
