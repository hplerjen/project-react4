import { ProductDto } from "./productMini";

export class OrderDto  {
    id?: string
    costumerId: number
    productAmount : {Product: ProductDto , amount: number}[]
    postageCosts : number
    totalCosts: number
  
    constructor(order : OrderDto) {
      this.id = order.id
      this.costumerId = order.costumerId
      this.productAmount = order.productAmount
      this.postageCosts = order.postageCosts
      this.totalCosts = order.totalCosts
    }
  }