export class ProductMini  {
    id?: string
    title: string
    description : string
    stock?: number
  
    constructor(product : ProductMini) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      this.stock = product.stock
    }
  }