// src/types/favorite.ts

export type Favorite = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    designer: {
      id: number;
      name: string;
    };
  };
  createdAt: string;
};
