export enum MediaType {
  CD = 1,
  DVD = 2,
  book = 3
}

export class ProductMini  {
    id?: string
    title: string
    description : string
    //mediaType: MediaType
    //image: string;
    //imageAltText: string;
    stock: number
    price: number
  
    constructor(product : ProductMini) {
      this.id = product.id
      this.title = product.title
      this.description = product.description
      //this.mediaType = product.mediaType
      //this.image = product.image
      //this.imageAltText = product.imageAltText
      this.stock = product.stock
      this.price = product.price
    }
  }