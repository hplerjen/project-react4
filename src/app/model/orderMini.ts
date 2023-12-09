export class OrderMini  {
    id?: string
    userid : string
    productsInCart :  { [key: string]: number }
    numberOfProducts: number

    constructor(order : OrderMini) {
      this.id = order.id
      this.userid = order.userid
      this.productsInCart = order.productsInCart
      this.numberOfProducts = order.numberOfProducts
    }
  }