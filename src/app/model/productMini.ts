export class ProductDto  {
    id?: string
    title: string
    description : string
  
    constructor(product : ProductDto) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
    }
  }