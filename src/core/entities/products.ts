interface Products extends BaseEntity {
  barCode?: string | null;
  shortName: string;
  name: string;
  image?: string | null;
  cost: number;
  price: number;
  profitMargin: number;
  stock?: number;
  minStock?: number;
  maxStock?: number;
  status?: boolean;
};
