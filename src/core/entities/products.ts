export type Products = {
  id?: string;
  barCode?: string | null;
  shortName: string;
  name: string;
  image?: string | null;
  cost: number;
  price: number;
  profitMargin: number;
  stock: number;
  minStock: number;
  maxStock: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
