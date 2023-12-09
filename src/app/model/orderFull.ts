import { CustomerAddress } from "./customerAddress";

export class OrderDto  {
    id?: string
    costumerId: number
    customerAddress : CustomerAddress
    productsInCart :  { [key: string]: number }
    postageCosts : number
    totalCosts: number
    paid : boolean
  
    constructor(order : OrderDto) {
      this.id = order.id
      this.costumerId = order.costumerId
      this.customerAddress = order.customerAddress
      this.productsInCart = order.productsInCart
      this.postageCosts = order.postageCosts
      this.totalCosts = order.totalCosts
      this.paid = order.paid
    }
  }