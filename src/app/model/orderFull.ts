import { Timestamp } from "firebase/firestore";
import { AddressMini } from "./addressMini";

export class Order  {
    id?: string
    costumerId: number
    customerAddress : AddressMini
    productsInCart :  { [key: string]: number }
    numberOfProducts: number
    totalCostWithoutPostage : number
    postage: string
    postageCost : number
    totalCost: number
    paid : boolean
    creationDate: Timestamp
    deliveryDate: Timestamp
    dueDate: Timestamp
  
    constructor(order : Order) {
      this.id = order.id
      this.costumerId = order.costumerId
      this.customerAddress = order.customerAddress
      this.productsInCart = order.productsInCart
      this.numberOfProducts = order.numberOfProducts
      this.totalCostWithoutPostage = order.totalCostWithoutPostage
      this.postage = order.postage
      this.postageCost = order.postageCost
      this.totalCost = order.totalCost
      this.paid = order.paid
      this.creationDate = order.creationDate
      this.deliveryDate = order.deliveryDate
      this.dueDate = order.dueDate
    }
  }