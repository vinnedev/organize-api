export function calcProfitMargin(cost: number, price: number): number {
  if (cost < 0 || price <= 0) {
    return 0;
  }

  const profit = price - cost;
  const profitMargin = (profit / cost) * 100;

  return profitMargin;
}