import { CustomerAddress } from "./customerAddress"
import { ProductInCartMini } from "./productInCartMini"

export class OrderMini  {
    id?: string
    userid : string
    address : CustomerAddress
    productsInCart : ProductInCartMini []
    paid : boolean
  
    constructor(order : OrderMini) {
      this.id = order.id
      this.userid = order.userid
      this.address = order.address
      this.productsInCart = order.productsInCart
      this.paid = order.paid;
    }
  }