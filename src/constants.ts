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

export type UpgradeRequirementType = 'fixed' | 'linear';
export type RequirementType = 'product' | 'referredUsers';

export interface Requirement {
  product?: EProduct;
  level: number;
  requirement: RequirementType;
  type: UpgradeRequirementType;
}

export interface ProductUpgrade {
  title: string;
  description: string;
  basePrice: number;
  upgradeMultiplier: number;
  baseDiscount: number;
  image: string;
  requirements: Requirement[] | null;
}

export const productUpgrades: Record<EProduct, ProductUpgrade> = {
  [EProduct.HERB]: {
    title: "Herb",
    description: "Some good ol'Herbs.",
    basePrice: 500,
    upgradeMultiplier: 1.4,
    baseDiscount: 10,
    image: `/assets/product/herb.webp`,
    requirements: null,
  },
  [EProduct.MUSHROOM]: {
    title: "Mushroom",
    description: "Used by shamans for centuries.",
    basePrice: 800,
    upgradeMultiplier: 1.4,
    baseDiscount: 12,
    image: `/assets/product/mushroom.webp`,
    requirements: [
      {
        product: EProduct.HERB,
        level: 5,
        requirement: "product",
        type: "fixed",
      },
    ],
  },
  [EProduct.ACID]: {
    title: "Acid",
    description: "Hoffman's bicycle ride.",
    basePrice: 1200,
    upgradeMultiplier: 1.4,
    baseDiscount: 15,
    image: `/assets/product/acid.webp`,
    requirements: [
      {
        product: EProduct.MUSHROOM,
        level: 5,
        requirement: "product",
        type: "fixed",
      },
    ],
  },
  [EProduct.PILL]: {
    title: "Pill",
    description: "Feel the love.",
    basePrice: 1600,
    upgradeMultiplier: 1.4,
    baseDiscount: 18,
    image: `/assets/product/pill.webp`,
    requirements: [
      {
        product: EProduct.ACID,
        level: 5,
        requirement: "product",
        type: "fixed",
      },
    ],
  },
  [EProduct.CRYSTAL]: {
    title: "Crystal",
    description: "Hisenberg's blue.",
    basePrice: 2000,
    upgradeMultiplier: 1.4,
    baseDiscount: 20,
    image: `/assets/product/crystal.webp`,
    requirements: [{ level: 3, requirement: "referredUsers", type: "fixed" }],
  },
  [EProduct.POWDER]: {
    title: "Powder",
    description: "Fidel's favorite.",
    basePrice: 2400,
    upgradeMultiplier: 1.4,
    baseDiscount: 22,
    image: `/assets/product/powder.webp`,
    requirements: [{ level: 5, requirement: "referredUsers", type: "fixed" }],
  },
};
