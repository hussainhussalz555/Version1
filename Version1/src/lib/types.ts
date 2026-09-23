export type ProductCategory = "Concealed Shower Sets" | "Vanity Units" | "Wash Basins" | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: ProductCategory;
  price: number;
  stock: number;
  finish: string;
  material: string;
  dimensions: string;
  warranty: string;
  description: string;
  specifications: Array<{ label: string; value: string }>;
  images: string[];
  sequenceFrames?: string[];
  modelUrl?: string;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
