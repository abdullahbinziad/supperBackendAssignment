export interface Order {
  userId: number;
  orders: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
}
