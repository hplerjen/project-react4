export class ProductMini  {
    id?: string
    title: string
    description : string
    //numberOnStock: number
  
    constructor(product : ProductMini) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      //this.numberOnStock = product.numberOnStock
    }
  }