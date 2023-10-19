import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import basketSVG from "../../media/thunder.png";
import coverImg from "../../media/cover-img.png";

interface ProductProps {
  cover?: string;
  name: string;
  description?: string;
  price: string;
}

const ProductCard = component$<ProductProps>(
  ({ cover, name, description, price }) => {
    return (
      <div class="flex flex-col items-center w-170px h-260px border rounded-8px p-10px bg-white">
        {!cover ? (
          <Image
            src={coverImg}
            width={30}
            height={30}
            alt={name}
            class="w-100% h-100px mx-auto"
          />
        ) : (
          <Image
            src={cover}
            width={30}
            height={30}
            alt={name}
            class="w-100% h-100px mx-auto"
          />
        )}
        <div class="flex justify-between items-center w-full ">
          <p class="text-20px text-black">{name}</p>
          <p class="text-20px text-black">${price}</p>
        </div>
        <p class="text-16px text-black w-100% h-100% my-0">{description}</p>
        <button class="flex self-end p-0 backdrop-none mt-10px">
          <Image src={basketSVG} width={30} height={30} />
        </button>
      </div>
    );
  },
);
export default ProductCard;
