import { AddressMini } from "./addressMini"

export class OrderMini  {
    id?: string
    userid : string
    productsInCart : Map <string,  number>
    numberOfProducts: number
    totalCostWithoutPostage : number
    costTotal: number
    address: AddressMini

    constructor(order : OrderMini) {
      this.id = order.id
      this.userid = order.userid
      this.productsInCart = order.productsInCart
      this.numberOfProducts = order.numberOfProducts
      this.totalCostWithoutPostage = order.totalCostWithoutPostage
      this.costTotal = order.costTotal
      this.address = order.address;
    }
  }