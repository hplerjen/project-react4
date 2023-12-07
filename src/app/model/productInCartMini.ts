export class ProductInCartMini  {
    id?: string
    title: string
    description : string
    numberInCart: number
  
    constructor(product : ProductInCartMini) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      this.numberInCart = product.numberInCart
    }
  }