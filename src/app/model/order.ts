import { Timestamp } from "firebase/firestore";
import { Address } from "./addressFull";

export class Order  {
    id?: string
    userId: string
    customerAddress : Address
    productsInCart :  { [key: string]: number }
    numberOfProducts: number
    totalCostWithoutPostage : number
    postageType: string
    postageCost : number
    totalCost: number
    paid : boolean
    delivered : boolean
    creationDate: Timestamp
    deliveryDate: Timestamp
    dueDate: Timestamp
    paidDate: Timestamp
  
    constructor(order : Order) {
      this.id = order.id
      this.userId = order.userId
      this.customerAddress = order.customerAddress
      this.productsInCart = order.productsInCart
      this.numberOfProducts = order.numberOfProducts
      this.totalCostWithoutPostage = order.totalCostWithoutPostage
      this.postageType = order.postageType
      this.postageCost = order.postageCost
      this.totalCost = order.totalCost
      this.paid = order.paid
      this.delivered = order.delivered
      this.creationDate = order.creationDate
      this.paidDate = order.paidDate
      this.deliveryDate = order.deliveryDate
      this.dueDate = order.dueDate
    }
  }