export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  hasMore: boolean;
};
