export class OrderMini {
  id?: string;
  userId?: string;
  productsInCart: Map<string, number>;
  numberOfProducts: number;
  costTotalWithoutPostage: number;

  constructor(order: OrderMini) {
    this.id = order.id;
    this.userId = order.userId;
    this.productsInCart = order.productsInCart;
    this.numberOfProducts = order.numberOfProducts;
    this.costTotalWithoutPostage = order.costTotalWithoutPostage;
  }
}
