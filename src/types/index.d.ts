export type CartType = {
  id: string;
  title: string;
  products: ProductType[];
};
export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
};
