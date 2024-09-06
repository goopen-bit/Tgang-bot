export enum EProduct {
  HERB = "Herb",
  MUSHROOM = "Mushroom",
  ACID = "Acid",
  PILL = "Pill",
  CRYSTAL = "Crystal",
  POWDER = "Powder",
}

export enum ProductIcon {
  Herb = "🌱",
  Mushroom = "🍄",
  Acid = "🧪",
  Pill = "💊",
  Crystal = "💎",
  Powder = "🧂",
}

export interface Product {
  name: EProduct;
  price: number;
  previousPrice?: number;
}

export interface Market {
  id: string;
  name: string;
  products: Product[];
  event?: Event;
}

export const market: Market = {
    id: "NY",
    name: "New York",
    products: [
      {
        name: EProduct.HERB,
        price: 20,
      },
      {
        name: EProduct.MUSHROOM,
        price: 25,
      },
      {
        name: EProduct.ACID,
        price: 30,
      },
      {
        name: EProduct.PILL,
        price: 40,
      },
      {
        name: EProduct.CRYSTAL,
        price: 60,
      },
      {
        name: EProduct.POWDER,
        price: 100,
      },
    ],
  };
